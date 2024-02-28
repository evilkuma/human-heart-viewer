import React, { useEffect, useState } from 'react';

import Scene3D from './components/Scene3D';
import ObjectsPanel from './components/ObjectsPanel';
import Loader from './components/Loader';

import objectsStore from './stores/objects-store';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        objectsStore.load('heart').then(() => setIsLoaded(true));
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
    }, [isLoaded]);

    return <>
        { !isLoaded && <Loader></Loader> }
        <ObjectsPanel></ObjectsPanel>
        <Scene3D />
    </>
}

export default App;
