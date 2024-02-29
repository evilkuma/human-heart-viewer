import { makeAutoObservable } from "mobx";

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';

class Scene3dStore {

    public scene = new THREE.Scene();
    public camera = new THREE.PerspectiveCamera();
    public controls: OrbitControls | null = null;

    private composer: EffectComposer | null = null;
    public outline = new OutlinePass(new THREE.Vector2(256, 256), this.scene, this.camera);
    private background = new TexturePass();
    private render = new RenderPass( this.scene, this.camera );
    private clear = new ClearPass('white', 1.0);

    constructor() {
        makeAutoObservable(this);

        this.camera.position.z = 5;

        this.background.clear = false;
        this.render.clear = false;
        this.outline.clear = false;

        this.background.map = Scene3dStore.createBackgroundTexture(512, 512);
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        this.composer = new EffectComposer(new THREE.WebGLRenderer({ canvas }))

        this.composer.addPass(this.clear);
        this.composer.addPass(this.background);
        this.composer.addPass(this.render);
        this.composer.addPass(this.outline);
        this.composer.addPass(new OutputPass());
        
        this.composer.renderer.setAnimationLoop(() => {
            if (!this.composer) return;
            this.composer.render();
        });

        this.controls = new OrbitControls(this.camera, canvas);
    }

    public setSize(width: number, height: number) {
        if (!this.composer) return;

        this.composer.renderer.setSize(width, height);
        this.composer.setSize(width, height);

        this.camera.fov = 75;
        this.camera.aspect = width / height;
        this.camera.near = 0.1;
        this.camera.far = 1000;
        this.camera.updateProjectionMatrix();
    }

    private static createBackgroundTexture(width: number, height: number): THREE.DataTexture {
        const gauss = (x: number, y: number) => (1 / (2 * Math.PI)) * Math.exp(-(x * x + y * y) / 2);

        const size = width * height;
		const data = new Uint8Array(4 * size);

		const chroma = [1, 1.5, 1.7];
		const max = gauss(0, 0);

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const u = 2 * (x / width) - 1;
				const v = 2 * (y / height) - 1;

				const i = x + width * y;
				const d = gauss(2 * u, 2 * v) / max;
				let r = (Math.random() + Math.random() + Math.random()) / 3;
				r = (d * 0.5 + 0.5) * r * 0.03;
				r = r * 0.4;

				data[4 * i]     = 255 * (d / 15 + 0.05 + r) * chroma[0];
				data[4 * i + 1] = 255 * (d / 15 + 0.05 + r) * chroma[1];
				data[4 * i + 2] = 255 * (d / 15 + 0.05 + r) * chroma[2];
				data[4 * i + 3] = 255;
			}
		}

		const texture = new THREE.DataTexture(data, width, height);
		texture.needsUpdate = true;

		return texture;
    }

}

const scene3dStore = new Scene3dStore();

export default scene3dStore;
