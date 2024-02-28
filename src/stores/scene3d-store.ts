import { makeAutoObservable } from "mobx";

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

class Scene3dStore {

    public scene = new THREE.Scene();
    public camera = new THREE.PerspectiveCamera();
    public controls: OrbitControls | null = null;

    private composer: EffectComposer | null = null;

    constructor() {
        makeAutoObservable(this);

        this.camera.position.z = 5;
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.composer = new EffectComposer(new THREE.WebGLRenderer({ canvas }))
        this.composer.addPass( new RenderPass( this.scene, this.camera ) );
        
        this.composer.renderer.setAnimationLoop(() => {
            if (!this.composer) return;
            this.composer.render();
        });

        this.controls = new OrbitControls(this.camera, canvas);
    }

    setSize(width: number, height: number) {
        if (!this.composer) return;

        this.composer.renderer.setSize(width, height);
        this.composer.setSize(width, height);

        this.camera.fov = 75;
        this.camera.aspect = width / height;
        this.camera.near = 0.1;
        this.camera.far = 1000;
        this.camera.updateProjectionMatrix();
    }

}

export default new Scene3dStore();
