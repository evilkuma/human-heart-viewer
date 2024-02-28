import React, { useEffect, useRef } from 'react';

import scene3dStore from '../stores/scene3d-store';

import api from '../api';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { observer } from 'mobx-react-lite';

function Scene3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        scene3dStore.setCanvas(canvas);

        new ResizeObserver(() => scene3dStore.setSize(canvas.clientWidth, canvas.clientHeight)).observe(canvas);
    }, [canvasRef]);


    useEffect(() => {
        api.getModelData('heart').then(data => {
            new GLTFLoader().parse(data, '', e => {scene3dStore.scene.add(e.scene); console.log(e)}) 
        });

        scene3dStore.scene.add(new THREE.AmbientLight(0xffffff, 1));
    }, []);

    return (
        <canvas ref={canvasRef} style={{width: '100%', height: '100%'}}></canvas>
    );
}

export default observer(Scene3D);
