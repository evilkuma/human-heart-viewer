import { makeAutoObservable } from "mobx";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import api from "../api";

import scene3dStore from "./scene3d-store";
import Mesh3D from "../models/Mesh3D";

class ObjectsStore {
    private gltfLoader = new GLTFLoader();

    public meshs = new Array<Mesh3D>();

    constructor() {
        makeAutoObservable(this);
    }

    private addMesh(mesh: Mesh3D) {
        this.meshs.push(mesh);
        scene3dStore.scene.add(mesh);
    }

    public async load(objName: string) {
        const [structData, objData] = await Promise.all([
            api.getData(objName),
            api.getModelData(objName)
        ]);
        const object3D = await new Promise(resolve => this.gltfLoader.parse(objData, '', resolve)) as any;

        for (const mesh of object3D.scene.children) {
            const meshData = structData.find(d => d.id === +mesh.userData.name);
            if (!meshData) continue;

            const mesh3D = new Mesh3D(mesh.geometry, mesh.material, meshData);
            mesh3D.position.copy(mesh.position);
            mesh3D.scale.copy(mesh.scale);
            mesh3D.quaternion.copy(mesh.quaternion);

            this.addMesh(mesh3D);
        }
    }
}

const objectsStore = new ObjectsStore();

export default objectsStore;
