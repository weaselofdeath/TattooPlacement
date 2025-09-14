import * as THREE from 'three';
import { setActiveLayer } from './layerManager.js';

let appState;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let isDraggingMove = false;
let isDraggingScaleRotate = false;
let dragStart = { x: 0, y: 0 };
let initialLayerState = {};
let isCameraMoving = false;
let mouseDownPosition = { x: 0, y: 0 };

export function initGizmoEvents(state) {
    appState = state;
    const canvas = appState.renderer.domElement;
    canvas.addEventListener('click', (event) => onCanvasClick(event, false));

    canvas.addEventListener('mousedown', (event) => {
        isCameraMoving = false;
        mouseDownPosition = { x: event.clientX, y: event.clientY };
        if (appState.pivotHelper) appState.pivotHelper.visible = true;
    });

    canvas.addEventListener('mousemove', (event) => {
        const dx = event.clientX - mouseDownPosition.x;
        const dy = event.clientY - mouseDownPosition.y;
        if (Math.sqrt(dx * dx + dy * dy) > 5) {
            isCameraMoving = true;
        }
    });

    canvas.addEventListener('mouseup', () => {
        if (appState.pivotHelper) appState.pivotHelper.visible = false;
    });

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

        const centerPoint2D = toScreenPosition(appState.activeLayer.lastIntersect, appState.camera);
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

            const centerPoint2D = toScreenPosition(appState.activeLayer.lastIntersect, appState.camera);
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

    if (moveHandle && !moveHandle.querySelector('svg')) {
        moveHandle.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" style="position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;display:block;pointer-events:none;" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2v16M2 10h16M5 5l10 10M15 5L5 15" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>`;
    }
    if (scaleRotateHandle && !scaleRotateHandle.querySelector('svg')) {
        scaleRotateHandle.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" style="position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;display:block;pointer-events:none;" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3a7 7 0 1 1-7 7" stroke="white" stroke-width="2" fill="none"/>
            <polygon points="10,0 13,7 7,7" fill="white"/>
        </svg>`;
    }

    if (!appState.activeLayer || !appState.activeLayer.lastIntersect) {
        moveHandle.style.display = 'none';
        scaleRotateHandle.style.display = 'none';
        return;
    }

    const centerPoint3D = appState.activeLayer.lastIntersect.clone();
    const centerPoint2D = toScreenPosition(centerPoint3D, appState.camera);
    moveHandle.style.display = 'block';
    moveHandle.style.left = `${centerPoint2D.x}px`;
    moveHandle.style.top = `${centerPoint2D.y}px`;

    const offsetPx = 60;
    scaleRotateHandle.style.display = 'block';
    scaleRotateHandle.style.left = `${centerPoint2D.x + offsetPx}px`;
    scaleRotateHandle.style.top = `${centerPoint2D.y}px`;
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

    if (!isDrag && isCameraMoving) return;

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
        if (!isDrag) {
            setActiveLayer(null);
        }
    }
}
