import React, { useEffect, useRef } from 'react';

import scene3dStore from '../stores/scene3d-store';

import * as THREE from 'three';
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
        scene3dStore.scene.add(new THREE.AmbientLight(0xaaaaaa, 2));
        scene3dStore.scene.add(new THREE.HemisphereLight( 0xffffbb, 0x080820, 2 ));
    }, []);

    return (
        <canvas ref={canvasRef} style={{width: '100%', height: '100%'}}></canvas>
    );
}

export default observer(Scene3D);
