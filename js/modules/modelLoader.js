import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

function processModel(model) {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.userData.size = box.getSize(new THREE.Vector3());
    console.log(`Model centered. Original center was at:`, center);
}

export async function loadModels(scene, skinMaterial) {
    const loader = new OBJLoader();

    const loadPromise = (url) => new Promise((resolve, reject) => {
        console.log(`Attempting to load model: ${url}`);
        loader.load(url,
            (obj) => {
                console.log(`Successfully loaded ${url}`);
                resolve(obj);
            },
            undefined,
            (error) => {
                console.error(`Failed to load ${url}`, error);
                reject(error);
            }
        );
    });

    const maleModel = await loadPromise('models/MaleBaseMesh.obj');
    maleModel.traverse(child => { if (child.isMesh) child.material = skinMaterial; });
    processModel(maleModel);
    scene.add(maleModel);

    const femaleModel = await loadPromise('models/FemaleBaseMesh.obj');
    femaleModel.traverse(child => { if (child.isMesh) child.material = skinMaterial; });
    femaleModel.scale.set(0.5, 0.5, 0.5);
    processModel(femaleModel);
    femaleModel.visible = false;
    scene.add(femaleModel);

    return { maleModel, femaleModel };
}