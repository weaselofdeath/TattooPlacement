import * as THREE from 'three';
import { initLayerControls } from './layerManager.js';
import { initGizmoEvents } from './gizmoManager.js';
import Picker from 'vanilla-picker';

let appState;

export async function initUIManager(state) {
    appState = state;
    appState.selectedColor = new THREE.Color(0xe0ac69);

    attachUIListeners();
    initLayerControls(appState);
    initGizmoEvents(appState);
}


function attachUIListeners() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sideMenu = document.getElementById('side-menu');
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sideMenu.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');
    });

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
        swatch.addEventListener('click', () => {
            appState.selectedColor.set(hex);
        });
        paletteContainer.appendChild(swatch);
    });

    const switchModelBtn = document.getElementById('switchModelBtn');
    switchModelBtn.textContent = 'Switch to Feminine';
    switchModelBtn.addEventListener('click', () => {
        appState.currentModel.visible = false;
        if (appState.currentModel === appState.maleModel) {
            appState.currentModel = appState.femaleModel;
            switchModelBtn.textContent = 'Switch to Masculine';
        } else {
            appState.currentModel = appState.maleModel;
            switchModelBtn.textContent = 'Switch to Feminine';
        }
        appState.currentModel.visible = true;
    });

    const bgColorPicker = document.getElementById('backgroundColorPicker');
    var picker = new Picker({
        parent: bgColorPicker,
        popup: false,
        alpha: false,
        color: "#f0f0f0",

    });
    picker.onChange = function(color) {
        appState.scene.background.set(color.rgbString);
    };
}