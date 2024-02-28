
import * as THREE from 'three';
import { MeshData } from '../types';

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
}

export default Mesh3D;
