import React, { useState } from 'react';
import api from '../../../services/api';

const AddFace = () => {
  const [newFace, setNewFace] = useState({
    name: '',
    image: '', // Will store a base64-encoded image string
    extra_data: {
      date: '',
      radio1: '  Permanent Face',
      radio2: '  Face - Staff and Workers',
      radio3: 'Face Temporary (Visitors)',
    },
  });

  const [error, setError] = useState('');

  // Helper: Convert file to base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // The result is "data:image/xxx;base64,..." – we extract only the base64 part
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleOnChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      try {
        const base64String = await fileToBase64(files[0]);
        setNewFace({ ...newFace, image: base64String });
      } catch (error) {
        console.error('Error converting file to base64:', error);
      }
    } else {
      setNewFace({ ...newFace, [name]: value });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/faces/', newFace);
      setNewFace({ name: '', image: '', extra_data: '' });
    } catch (error) {
      console.error('Error creating face:', error);
    }
  };

  return (
    <div className="">
      <form action="" className="full" onSubmit={handleOnSubmit}>
        <p className="lg:flex lg:flex-row flex-col gap-4  mt-6">
          <p className="lg:w-6/12 w-full">
            <label
              htmlFor="Name"
              className="font-semibold lg:text-md sm:text-sm text-[10px] text-gray-800"
            >
              Full Name
            </label>{' '}
            <br />
            <input
              type="text"
              className="border-2 lg:h-14 sm:h-12 h-10 text-gray-400 p-3 mt-2 font-light lg:text-md sm:text-sm text-[10px] bg-gray-50 w-full rounded-md focus:outline-none"
              placeholder="Enter Full Name"
              name="name"
              id="Name"
              value={newFace.name}
              onChange={handleOnChange}
            />
            {error === 'nameError' ? (
              <p className="sm:text-sm text-[10px] text-red-500">
                Name is required
              </p>
            ) : null}
            <p className="lg:mt-8 sm:mt-4 mt-2">
              <p className="flex lg:gap-24 sm:gap-12 gap-4">
                <label
                  htmlFor="face"
                  className="sm:text-sm text-[10px] text-gray-700 flex items-center"
                >
                  <input
                    type="radio"
                    name="radio"
                    id="face"
                    className="accent-red-600"
                    value={newFace.extra_data.radio1}
                    checked={
                      newFace.extra_data.radio1 !== newFace.extra_data.radio2
                    }
                    onChange={handleOnChange}
                  />{' '}
                  &nbsp;{newFace.extra_data.radio1}
                </label>
                <label
                  htmlFor="Staff"
                  className="sm:text-sm text-[10px]  text-gray-700 flex items-center"
                >
                  <input
                    type="radio"
                    name="radio"
                    id="Staff"
                    className="accent-red-600 "
                    value={newFace.extra_data.radio2}
                    checked={
                      newFace.extra_data.radio2 !== newFace.extra_data.radio1
                    }
                    onChange={handleOnChange}
                  />{' '}
                  &nbsp;{newFace.extra_data.radio2}
                </label>
              </p>
              {error === 'radioError' ? (
                <p className="text-sm text-red-500">Fill these required</p>
              ) : null}
            </p>
          </p>
          <p className="text-start lg:mt-0 mt-4 lg:w-6/12 w-full">
            <label
              htmlFor="uPloadImg"
              className="font-semibold lg:text-md sm:text-sm text-[10px] text-gray-700"
            >
              Up load Image
            </label>{' '}
            <br />
            <p className="relative flex items-center w-full">
              <svg
                className="absolute lg:top-6 sm:top-5 top-4 lg:left-4 left-2"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9224 18.3225H12.9224V13.6275L15.0224 15.7275L15.7304 15.0145L12.4224 11.7065L9.11436 15.0145L9.82836 15.7215L11.9224 13.6275V18.3225ZM7.03836 21.5525C6.5777 21.5525 6.19336 21.3985 5.88536 21.0905C5.57736 20.7825 5.42303 20.3982 5.42236 19.9375V5.16749C5.42236 4.70749 5.5767 4.32349 5.88536 4.01549C6.19403 3.70749 6.57836 3.55316 7.03836 3.55249H14.9224L19.4224 8.05249V19.9375C19.4224 20.3975 19.2684 20.7818 18.9604 21.0905C18.6524 21.3992 18.2677 21.5532 17.8064 21.5525H7.03836ZM14.4224 8.55249H18.4224L14.4224 4.55249V8.55249Z"
                  fill="#474747"
                />
              </svg>

              <p className="absolute lg:top-7 sm:top-5 top-5 lg:left-12 left-8 font-semibold lg:text-md sm:text-sm text-[10px] block  text-gray-800">
                Upload You Face
              </p>
              <input
                className="border mt-2 lg:text-md sm:text-sm text-[10px] rounded-lg lg:h-14 sm:h-12 h-10 focus:outline-none file:w-6/12 file:h-full file:text-transparent file:border-none text-lg file:bg-[#ECEAEA] font-light  bg-white w-full "
                type="file"
                name="image"
                accept="image/*"
                onChange={handleOnChange}
              />
            </p>
            {error !== 'upLoadImgError' ? (
              <p className="text-red-600 text-sm">Upload Attach</p>
            ) : (
              ''
            )}
            <p className="mt-8">
              <label
                htmlFor="Temporary"
                className="sm:text-sm text-[10px] flex items-center text-gray-700"
              >
                <input
                  type="radio"
                  name="Temporary"
                  id="Temporary"
                  className="accent-red-600 "
                  value={newFace.extra_data.radio3}
                />{' '}
                &nbsp;{newFace.extra_data.radio3}
              </label>
              <input
                type="datetime-local"
                className="border-2 lg:h-14 sm:h-12 h-10 text-gray-400 p-3 mt-2 font-light lg:text-md sm:text-sm text-[10px] bg-gray-50 w-full rounded-md focus:outline-none"
                placeholder="date time"
                name="date"
                id="date"
                value={newFace.extra_data.date}
                onChange={handleOnChange}
              />
              {setError === 'dateError' ? (
                <p className="text-red-600 text-sm">Enter the Date here</p>
              ) : (
                ''
              )}
            </p>
          </p>
        </p>
        <button className="lg:w-2/12 sm:w-4/12 w-6/12 bg-[#DA3F3F] lg:text-md sm:text-sm text-[10px] py-3 text-white rounded-md mt-7">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFace;
