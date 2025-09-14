import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 250);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.prepend(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.target.set(0, 0, 0);
    controls.update();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 1024;
    textureCanvas.height = 1024;
    const textureContext = textureCanvas.getContext('2d');
    const texture = new THREE.CanvasTexture(textureCanvas);
    const skinMaterial = new THREE.MeshStandardMaterial({ map: texture });

    const pivotHelper = new THREE.Group();
    const pivotGeometry = new THREE.CircleGeometry(2, 32);
    const visibleMaterial = new THREE.MeshBasicMaterial({
        color: 0x007aff, transparent: true, opacity: 0.5,
        side: THREE.DoubleSide, depthWrite: false
    });
    const visibleCircle = new THREE.Mesh(pivotGeometry, visibleMaterial);
    const occludedMaterial = new THREE.MeshBasicMaterial({
        color: 0x003366, transparent: true, opacity: 0.25,
        side: THREE.DoubleSide, depthFunc: THREE.GreaterDepth
    });
    const occludedCircle = new THREE.Mesh(pivotGeometry, occludedMaterial);
    pivotHelper.add(visibleCircle);
    pivotHelper.add(occludedCircle);
    pivotHelper.visible = false;
    scene.add(pivotHelper);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return { scene, camera, renderer, controls, skinMaterial, textureContext, texture, pivotHelper };
}