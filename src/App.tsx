import React, { useEffect, useState } from 'react';

import Scene3D from './components/Scene3D';
import ObjectsPanel from './components/ObjectsPanel';
import Loader from './components/Loader';

import objectsStore from './stores/objects-store';
import scene3dStore from './stores/scene3d-store';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        objectsStore.load('heart').then(() => setIsLoaded(true));
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        scene3dStore.zoomTo();
    }, [isLoaded]);

    return <>
        { !isLoaded && <Loader></Loader> }
        { !!objectsStore.meshs.length && <ObjectsPanel></ObjectsPanel> }
        <Scene3D />
    </>
}

export default App;
