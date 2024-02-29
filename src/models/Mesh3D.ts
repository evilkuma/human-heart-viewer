
import * as THREE from 'three';
import { MeshData } from '../types';
import objectsStore from '../stores/objects-store';
import scene3dStore from '../stores/scene3d-store';

class Mesh3D extends THREE.Mesh {
    private meshData: MeshData;

    constructor(geometry: THREE.BufferGeometry, material: THREE.Material, data: MeshData) {
        super(geometry, material);

        this.meshData = data;
    }

    get dataId() {
        return this.meshData.id;
    }

    get dataTitle() {
        return this.meshData.title;
    }

    get isSelected() {
        return scene3dStore.outline.selectedObjects[0] === this;
    }

    toggleSelection() {
        if (!objectsStore.meshs.includes(this)) return;

        if (this.isSelected) return scene3dStore.outline.selectedObjects = [];
        scene3dStore.outline.selectedObjects = [this];
    }

    zoom() {
        const sceneBS = scene3dStore.bs;
        const bs = new THREE.Box3().setFromObject(this).getBoundingSphere(new THREE.Sphere());
        scene3dStore.zoomTo(bs, sceneBS.center.clone().sub(bs.center).normalize());
    }
}

export default Mesh3D;
