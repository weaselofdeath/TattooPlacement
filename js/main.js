import { initScene } from './modules/sceneSetup.js';
import { loadModels } from './modules/modelLoader.js';
import { initUIManager } from './modules/uiManager.js';
import { updateTexture } from './modules/textureManager.js';
import { updateGizmoPositions } from './modules/gizmoManager.js';

const appState = {
    scene: null, camera: null, renderer: null, controls: null,
    maleModel: null, femaleModel: null, currentModel: null,
    skinMaterial: null, selectedColor: null,
    tattooLayers: [], activeLayer: null,
    textureContext: null, texture: null,
    pivotHelper: null
};

async function main() {
    try {
        const sceneObjects = initScene();
        Object.assign(appState, sceneObjects);

        const models = await loadModels(appState.scene, appState.skinMaterial);
        appState.maleModel = models.maleModel;
        appState.femaleModel = models.femaleModel;
        appState.currentModel = appState.maleModel;

        await initUIManager(appState);

        animate();

    } catch (error) {
        console.error("Failed to initialize the application:", error);
        document.body.innerHTML = `<div style="padding: 20px; font-family: monospace;"><h1>Application Error</h1><p>Could not start. Please check the console for details.</p><pre>${error.stack}</pre></div>`;
    }
}

function animate() {
    requestAnimationFrame(animate);
    appState.controls.update();

    if (appState.pivotHelper && appState.pivotHelper.visible) {
        appState.pivotHelper.position.copy(appState.controls.target);
        appState.pivotHelper.lookAt(appState.camera.position);
    }

    updateGizmoPositions(appState);

    updateTexture(appState);
    appState.renderer.render(appState.scene, appState.camera);
}

main();