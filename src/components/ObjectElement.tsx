import React from 'react';
import Mesh3D from '../models/Mesh3D';

type ObjectElementProps = {
    mesh: Mesh3D
}

function ObjectElement(props: ObjectElementProps) {
    const onClick = () => {
        props.mesh.toggleSelection();
        if (props.mesh.isSelected) props.mesh.zoom();
    };

    return (
        <p className="cursor-pointer text-base leading-relaxed text-gray-500 dark:text-gray-400 hover:text-gray-200" onClick={onClick}>
            { props.mesh.dataTitle }
        </p>
    );
}

export default ObjectElement;
