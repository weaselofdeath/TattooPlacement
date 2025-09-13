import * as THREE from 'three';
import { setActiveLayer } from './layerManager.js';

let appState;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let isDraggingMove = false;
let isDraggingScaleRotate = false;
let dragStart = { x: 0, y: 0 };
let initialLayerState = {};

export function initGizmoEvents(state) {
    appState = state;
    const canvas = appState.renderer.domElement;
    // THIS IS THE FIX: The onCanvasClick function is now defined and used here.
    canvas.addEventListener('click', (event) => onCanvasClick(event, false));

    // Pivot Helper Visibility
    canvas.addEventListener('mousedown', () => {
        if (appState.pivotHelper) appState.pivotHelper.visible = true;
    });
    canvas.addEventListener('mouseup', () => {
        if (appState.pivotHelper) appState.pivotHelper.visible = false;
    });
    canvas.addEventListener('mouseleave', () => {
        if (appState.pivotHelper) appState.pivotHelper.visible = false;
    });

    // Handle Drag Listeners
    const moveHandle = document.getElementById('move-handle');
    const scaleRotateHandle = document.getElementById('scale-rotate-handle');

    moveHandle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        isDraggingMove = true;
        appState.controls.enabled = false;
    });

    scaleRotateHandle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        isDraggingScaleRotate = true;
        appState.controls.enabled = false;

        const centerPoint2D = toScreenPosition(appState.activeLayer.lastIntersect.clone().applyMatrix4(appState.currentModel.matrixWorld), appState.camera);
        dragStart.x = e.clientX;
        dragStart.y = e.clientY;

        initialLayerState.size = appState.activeLayer.size;
        initialLayerState.rotation = appState.activeLayer.rotation;

        const dx = e.clientX - centerPoint2D.x;
        const dy = e.clientY - centerPoint2D.y;
        initialLayerState.dragAngle = Math.atan2(dy, dx);
        initialLayerState.dragDist = Math.sqrt(dx * dx + dy * dy);
    });

    window.addEventListener('mousemove', (e) => {
        if (isDraggingMove) {
            onCanvasClick(e, true);
        }
        if (isDraggingScaleRotate) {
            if (!appState.activeLayer || !appState.activeLayer.lastIntersect) return;

            const centerPoint2D = toScreenPosition(appState.activeLayer.lastIntersect.clone().applyMatrix4(appState.currentModel.matrixWorld), appState.camera);
            const dx = e.clientX - centerPoint2D.x;
            const dy = e.clientY - centerPoint2D.y;

            const currentAngle = Math.atan2(dy, dx);
            const currentDist = Math.sqrt(dx * dx + dy * dy);

            const angleDiff = currentAngle - initialLayerState.dragAngle;
            appState.activeLayer.rotation = initialLayerState.rotation + (angleDiff * 180 / Math.PI);
            document.getElementById('tattooRotationSlider').value = appState.activeLayer.rotation;

            if (initialLayerState.dragDist > 0) {
                const scaleRatio = currentDist / initialLayerState.dragDist;
                appState.activeLayer.size = initialLayerState.size * scaleRatio;
                document.getElementById('tattooSizeSlider').value = appState.activeLayer.size;
            }
        }
    });

    window.addEventListener('mouseup', () => {
        isDraggingMove = false;
        isDraggingScaleRotate = false;
        appState.controls.enabled = true;
    });
}

export function updateGizmoPositions(state) {
    appState = state;
    const moveHandle = document.getElementById('move-handle');
    const scaleRotateHandle = document.getElementById('scale-rotate-handle');

    if (!appState.activeLayer || !appState.activeLayer.lastIntersect) {
        moveHandle.style.display = 'none';
        scaleRotateHandle.style.display = 'none';
        return;
    }

    const centerPoint3D = appState.activeLayer.lastIntersect.clone().applyMatrix4(appState.currentModel.matrixWorld);
    const centerPoint2D = toScreenPosition(centerPoint3D, appState.camera);

    moveHandle.style.display = 'block';
    moveHandle.style.left = `${centerPoint2D.x}px`;
    moveHandle.style.top = `${centerPoint2D.y}px`;

    const modelSize = appState.currentModel.userData.size;
    const tattooWorldSize = modelSize.x * appState.activeLayer.size;
    const edgePoint3D = centerPoint3D.clone().add(new THREE.Vector3(tattooWorldSize / 2, 0, 0));
    const edgePoint2D = toScreenPosition(edgePoint3D, appState.camera);

    const dx = edgePoint2D.x - centerPoint2D.x;
    const dy = edgePoint2D.y - centerPoint2D.y;
    const screenRadius = Math.sqrt(dx * dx + dy * dy);

    const rotation = appState.activeLayer.rotation * Math.PI / 180;

    const cornerX = centerPoint2D.x + screenRadius * Math.cos(rotation - Math.PI / 4);
    const cornerY = centerPoint2D.y + screenRadius * Math.sin(rotation - Math.PI / 4);

    scaleRotateHandle.style.display = 'block';
    scaleRotateHandle.style.left = `${cornerX}px`;
    scaleRotateHandle.style.top = `${cornerY}px`;
}

function toScreenPosition(point3D, camera) {
    const vector = point3D.clone();
    vector.project(camera);
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
    return { x, y };
}

function onCanvasClick(event, isDrag = false) {
    if (isDrag && !isDraggingMove) return;

    // Don't do anything if a UI element was clicked
    const uiElements = document.querySelectorAll('#layers-panel, #side-menu, #hamburger-btn');
    for (const el of uiElements) {
        if (el.contains(event.target)) return;
    }

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, appState.camera);
    const intersects = raycaster.intersectObject(appState.currentModel, true);

    if (intersects.length > 0) {
        if (appState.activeLayer) {
            const intersect = intersects[0];
            appState.activeLayer.uv = intersect.uv;
            appState.activeLayer.lastIntersect = intersect.point;
        }
    } else {
        // If we clicked empty space, deselect the active layer
        if (!isDrag) {
            setActiveLayer(null);
        }
    }
}
