import * as THREE from 'three';

let appState;
const raycaster = new THREE.Raycaster();

export function initLayerControls(state) {
    appState = state;
    attachLayerListeners();
}

function attachLayerListeners() {
    const textureInput = document.getElementById('textureInput');
    document.getElementById('addTattooBtn').onclick = () => textureInput.click();

    textureInput.onchange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const newLayer = {
                        id: Date.now(), image: img, uv: new THREE.Vector2(0.5, 0.5),
                        size: 0.1, rotation: 0, visible: true, opacity: 1.0,
                        lastIntersect: null
                    };
                    appState.tattooLayers.push(newLayer);
                    setActiveLayer(newLayer);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    document.getElementById('tattooSizeSlider').oninput = (e) => {
        if (appState.activeLayer) appState.activeLayer.size = parseFloat(e.target.value);
    };
    document.getElementById('tattooRotationSlider').oninput = (e) => {
        if (appState.activeLayer) appState.activeLayer.rotation = parseFloat(e.target.value);
    };
    document.getElementById('tattooOpacitySlider').oninput = (e) => {
        if (appState.activeLayer) appState.activeLayer.opacity = parseFloat(e.target.value);
    };
}

function renderLayersUI() {
    const layersList = document.getElementById('layers-list');
    layersList.innerHTML = '';
    [...appState.tattooLayers].reverse().forEach(layer => {
        const item = document.createElement('li');
        item.className = 'layer-item';
        item.onclick = () => setActiveLayer(layer);

        if (appState.activeLayer && layer.id === appState.activeLayer.id) {
            item.classList.add('active');
        }
        if (!layer.visible) {
            item.classList.add('hidden');
        }

        const img = document.createElement('img');
        img.src = layer.image.src;
        img.onclick = (e) => {
            e.stopPropagation();
            const replaceInput = document.createElement('input');
            replaceInput.type = 'file';
            replaceInput.accept = 'image/*';
            replaceInput.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (re) => {
                        const newImg = new Image();
                        newImg.onload = () => {
                            layer.image = newImg;
                            renderLayersUI();
                        };
                        newImg.src = re.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
            replaceInput.click();
        };

        const name = document.createElement('span');
        name.textContent = `Layer ${layer.id}`.slice(-6);

        const controls = document.createElement('div');
        controls.className = 'layer-controls';

        const visibilityBtn = document.createElement('button');
        visibilityBtn.className = 'toggle-visibility-btn';
        visibilityBtn.innerHTML = '👁️';
        visibilityBtn.onclick = (e) => {
            e.stopPropagation();
            layer.visible = !layer.visible;
            renderLayersUI();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            appState.tattooLayers = appState.tattooLayers.filter(l => l.id !== layer.id);
            if (appState.activeLayer && appState.activeLayer.id === layer.id) {
                const lastLayer = appState.tattooLayers.length > 0 ? appState.tattooLayers[appState.tattooLayers.length - 1] : null;
                setActiveLayer(lastLayer);
            } else {
                renderLayersUI();
            }
        };

        controls.appendChild(visibilityBtn);
        controls.appendChild(deleteBtn);
        item.appendChild(img);
        item.appendChild(name);
        item.appendChild(controls);
        layersList.appendChild(item);
    });
}

export function setActiveLayer(layer) {
    appState.activeLayer = layer;
    const editor = document.getElementById('layer-editor');
    if (layer) {
        editor.style.display = 'block';
        document.getElementById('tattooSizeSlider').value = layer.size;
        document.getElementById('tattooRotationSlider').value = layer.rotation;
        document.getElementById('tattooOpacitySlider').value = layer.opacity;

        if (!layer.lastIntersect) {
            console.log("New layer detected, finding initial intersection point...");
            raycaster.setFromCamera(new THREE.Vector2(0, 0), appState.camera);
            const intersects = raycaster.intersectObject(appState.currentModel, true);
            if (intersects.length > 0) {
                const intersect = intersects[0];
                layer.uv = intersect.uv;
                layer.lastIntersect = intersect.point;
                console.log("Initial point found at UV:", layer.uv);
            } else {
                console.warn("Could not find an initial intersection point for the new layer.");
            }
        }

    } else {
        editor.style.display = 'none';
    }
    renderLayersUI();
}