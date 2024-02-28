import React from 'react';

function Loader() {
    return (
        <div 
            id="default-modal" 
            tabIndex={-1} 
            aria-hidden="false" 
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-100%] max-h-full flex bg-gray-900/70"
        >
            
            <div 
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                > Loading... </span>
            </div>
        </div>
    );
}

export default Loader;
