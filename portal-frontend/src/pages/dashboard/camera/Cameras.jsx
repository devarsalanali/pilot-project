import React, { useState } from 'react';
import CameraList from './CamerasList';
import AddCamera from './AddCamera';

const Cameras = () => {
  const [cameraManag, setCameraManag] = useState('CamerasList');

  return (
    <div className="font-inter px-4">
      <div className="border-b flex lg:gap-20 gap-4">
        <button
          onClick={() => setCameraManag('CamerasList')}
          className={`lg:text-lg sm:text-sm text-[12px] font-light ${
            cameraManag === 'CamerasList'
              ? 'border-gray-700 text-gray-700'
              : ' border-transparent'
          } font-inter py-4 border-b-4 hover:border-gray-700 rounded-t-sm text-gray-400 hover:text-gray-800`}
        >
          Camera’s List
        </button>
        <button
          onClick={() => {
            setCameraManag('AddCamera');
          }}
          className={`lg:text-lg sm:text-sm text-[12px] font-light ${
            cameraManag === 'AddCamera'
              ? 'border-gray-700 text-gray-700'
              : ' border-transparent'
          } font-intert py-4 border-b-4 hover:border-gray-700 rounded-t-sm text-gray-400 hover:text-gray-800`}
        >
          Add Camera
        </button>
      </div>
      <div>
        {cameraManag === 'CamerasList' ? <CameraList /> : null}
        {cameraManag === 'AddCamera' ? <AddCamera /> : null}
      </div>
    </div>
  );
};

export default Cameras;
