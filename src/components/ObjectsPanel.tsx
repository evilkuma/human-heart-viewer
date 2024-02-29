import React from 'react';
import Draggable from 'react-draggable';

import { observer } from 'mobx-react-lite';
import objectsStore from '../stores/objects-store';
import ObjectElement from './ObjectElement';

import centered from './../assets/centered.svg';
import scene3dStore from '../stores/scene3d-store';

function ObjectsPanel() {
    return (
        <Draggable
            defaultClassName='fixed'
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
        >
            <div className="p-4">
                <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* header */}
                    <div className="handle cursor-move flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-l font-semibold text-gray-900 dark:text-white"> Structure </h3>
                        <img className="cursor-pointer w-4 h-4" src={centered} title='centered' onClick={() => scene3dStore.zoomTo()}/>
                    </div>
                    {/* body  */}
                    <div className="p-3">
                        { objectsStore.meshs.map(m => <ObjectElement mesh={m} key={m.dataId}></ObjectElement>) }
                    </div>
                </div>
            </div>
        </Draggable>
    );
}

export default observer(ObjectsPanel);
