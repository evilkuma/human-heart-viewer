import React from 'react';
import Mesh3D from '../models/Mesh3D';
import objectsStore from '../stores/objects-store';

type ObjectElementProps = {
    mesh: Mesh3D
}

function ObjectElement(props: ObjectElementProps) {
    const onClick = () => {
        objectsStore.toggleMesh(props.mesh);
    };

    return (
        <p className="cursor-pointer text-base leading-relaxed text-gray-500 dark:text-gray-400 hover:text-gray-200" onClick={onClick}>
            { props.mesh.dataTitle }
        </p>
    );
}

export default ObjectElement;
