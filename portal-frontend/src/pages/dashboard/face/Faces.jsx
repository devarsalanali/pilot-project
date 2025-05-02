import React, { useState } from 'react';
import AddFace from './AddFace';
import FacesList from './FacesList';

const Faces = () => {
  const [addFace, setAddFace] = useState('AddFace');
  return (
    <div className="font-inter px-4">
      <div className="border-b flex lg:gap-20 gap-2">
        <button
          onClick={() => setAddFace('AddFace')}
          className={`lg:text-lg sm:text-sm text-[12px] font-light ${
            addFace === 'AddFace'
              ? 'border-gray-700 text-gray-700'
              : ' border-transparent'
          } font-inter py-4 border-b-4 hover:border-gray-700 rounded-t-sm text-gray-400 hover:text-gray-800`}
        >
          Add Face Details
        </button>
        <button
          onClick={() => {
            setAddFace('ExistingFaces');
          }}
          className={`lg:text-lg sm:text-sm text-[12px] font-light ${
            addFace === 'ExistingFaces'
              ? 'border-gray-700 text-gray-700'
              : ' border-transparent'
          } font-intert py-4 border-b-4 hover:border-gray-700 rounded-t-sm text-gray-400 hover:text-gray-800`}
        >
          Manage Existing Faces
        </button>
      </div>
      <div>
        {addFace === 'AddFace' ? <AddFace /> : null}
        {addFace === 'ExistingFaces' ? <FacesList /> : null}
      </div>
    </div>
  );
};

export default Faces;
