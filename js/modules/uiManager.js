import * as THREE from 'three';
import { initLayerControls } from './layerManager.js';
import { initGizmoEvents } from './gizmoManager.js';

let appState;

export async function initUIManager(state) {
    appState = state;
    appState.selectedColor = new THREE.Color(0xe0ac69);

    await loadUI();
    attachUIListeners();
    // Initialize the specialized UI modules
    initLayerControls(appState);
    initGizmoEvents(appState);
}

async function loadUI() {
    try {
        const response = await fetch('html/tattoo-view.html');
        if (!response.ok) throw new Error(`Fetch UI failed: ${response.status}`);
        const uiHTML = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = uiHTML;
        while (tempDiv.firstChild) {
            document.getElementById('app-container').appendChild(tempDiv.firstChild);
        }
        console.log("UI HTML loaded and attached.");
    } catch (error) {
        console.error("Error loading UI:", error);
        throw error;
    }
}

function attachUIListeners() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sideMenu = document.getElementById('side-menu');
    hamburgerBtn.onclick = (e) => {
        e.stopPropagation();
        sideMenu.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');
    };

    window.addEventListener('click', (e) => {
        if (!sideMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            sideMenu.classList.remove('open');
            hamburgerBtn.classList.remove('open');
        }
    });

    const skinTones = [0x260701, 0x3d0c02, 0x843722, 0xaf6e51, 0xc69076, 0xe0ac69, 0xf1c27d, 0xffdcb0];
    const paletteContainer = document.getElementById('paletteContainer');

    const initialColor = new THREE.Color(skinTones[5]);
    appState.selectedColor.set(initialColor);

    skinTones.forEach(hex => {
        const swatch = document.createElement('div');
        swatch.className = 'swatch';
        swatch.style.backgroundColor = `#${new THREE.Color(hex).getHexString()}`;
        swatch.onclick = () => {
            appState.selectedColor.set(hex);
        };
        paletteContainer.appendChild(swatch);
    });

    const switchModelBtn = document.getElementById('switchModelBtn');
    switchModelBtn.textContent = 'Switch to Feminine';
    switchModelBtn.onclick = () => {
        appState.currentModel.visible = false;
        if (appState.currentModel === appState.maleModel) {
            appState.currentModel = appState.femaleModel;
            switchModelBtn.textContent = 'Switch to Masculine';
        } else {
            appState.currentModel = appState.maleModel;
            switchModelBtn.textContent = 'Switch to Feminine';
        }
        appState.currentModel.visible = true;
    };

    const bgColorPicker = document.getElementById('bgColorPicker');
    bgColorPicker.addEventListener('input', (e) => {
        appState.scene.background.set(e.target.value);
    });
}