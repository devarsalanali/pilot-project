import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const FacesList = () => {
  const [faces, setFaces] = useState([]);

  const fetchFaces = async () => {
    try {
      const response = await api.get('/faces/');
      setFaces(response.data);
    } catch (error) {
      console.error('Error fetching faces:', error);
    }
  };

  const handleSelectAllChange = (e) => {
    const newSelected = e.target.checked;
    setFaces(faces.map((face) => ({ ...face, selected: newSelected })));
  };

  const handleSelectChange = (index, e) => {
    const newCameras = [...faces];
    newCameras[index].selected = e.target.checked;
    setFaces(newCameras);
  };

  const handleDelete = () => {
    setFaces(faces.filter((face) => !face.selected));
  };

  // Fetch known faces when the component mounts
  useEffect(() => {
    fetchFaces();
  }, []);

  return (
    <div className="font-inter mt-5 m-auto">
      <div className="flex justify-between items-center mt-4">
        <p>
          <input
            type="checkbox"
            className="border-none"
            name="check"
            id="check"
            checked={faces.every((face) => face.selected)}
            onChange={handleSelectAllChange}
          />
          <label
            htmlFor="check"
            className="lg:text-md text-sm text-gray-400 ml-2"
          >
            Select All
          </label>
        </p>
        <div className="flex lg:gap-4 gap-2 items-center">
          <button className="border-2 border-gray-300 p-2 lg:text-md sm:text-sm text-[10px] text-gray-500 rounded-lg">
            Quick Add
          </button>
          <button className="border-2 border-gray-300 p-2 lg:text-md sm:text-sm text-[10px] text-gray-500 rounded-lg">
            Modify
          </button>
          <button
            className="border-2 border-gray-300 p-2 lg:text-md sm:text-sm text-[10px] text-gray-500 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="container mx-auto rounded-md overflow-hidden mt-4">
        <table className="w-full border-collapse border border-[#F8F8F8]">
          <thead>
            <tr className="bg-[#F8F8F8]  h-16 text-sm font-light text-gray-500">
              <th className="border border-l-gray-200  border-white border-b-gray-200 border-t-gray-200 p-2"></th>
              <th className="border border-white border-b-gray-200 lg:text-md sm:text-sm text-[10px] border-t-gray-200 lg:p-2 font-semibold">
                Photo
              </th>
              <th className="border border-white border-b-gray-200 lg:text-md sm:text-sm text-[10px] border-t-gray-200 lg:p-2 font-semibold">
                Name
              </th>
              <th className="border border-white border-b-gray-200 lg:text-md sm:text-sm text-[10px]  border-t-gray-200  lg:p-2 font-semibold lg:table-cell hidden ">
                Type
              </th>
              <th className="border border-white border-b-gray-200 lg:text-md sm:text-sm text-[10px]  border-t-gray-200  lg:p-2 font-semibold lg:table-cell hidden ">
                Create Date
              </th>
              <th className="border border-white border-b-gray-200 lg:text-md sm:text-sm text-[10px]  border-t-gray-200  lg:p-2 font-semibold">
                Visting Date
              </th>
              <th className="border border-white border-b-gray-200 lg:text-md sm:text-sm text-[10px]  border-t-gray-200 border-r-gray-200 lg:p-2 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {faces.map((face, index) => (
              <tr
                key={index}
                className="h-16 text-sm text-gray-500 font-light text-center"
              >
                <td className="border p-2">
                  <input
                    type="checkbox"
                    className="border-none"
                    name="check"
                    checked={face.selected}
                    onChange={(e) => handleSelectChange(index, e)}
                  />
                </td>
                <td className="border p-2 lg:text-md sm:text-sm text-[10px]">
                  <img
                    src={`data:image/jpeg;base64,${face.image}`}
                    alt={face.name}
                    style={{ width: '100px' }}
                  />
                </td>
                <td className="border p-2 lg:text-md sm:text-sm text-[10px]">
                  {face.name}
                </td>
                <td className="border  lg:p-6 lg:text-md sm:text-sm text-[10px] lg:table-cell hidden ">
                  {face.type ? face.type : 'Permenant'}
                </td>
                <td className="border  lg:p-6 lg:text-md sm:text-sm text-[10px] lg:table-cell hidden ">
                  {face.extra_data.date ? face.extra_data.date : 'NA'}
                </td>
                <td className="border p-2 lg:text-md sm:text-sm text-[10px]">
                  {face.vistingDateTo ? face.vistingDateTo : 'NA'} To{' '}
                  {face.vistingDate ? face.vistingDate : 'NA'} <br />{' '}
                  {face.timeing ? face.timeing : 'NA'} am To{' '}
                  {face.endTiming ? face.endTiming : 'NA'}pm
                </td>
                <td className="border p-2">
                  <p className="lg:text-md sm:text-sm text-[10px]  flex items-center gap-4 justify-center">
                    <button className="text-white bg-[#48B672] py-2 px-3 rounded-md w-4/12">
                      Edit
                    </button>
                    <button
                      className="bg-[#FF3E3E40] w-7/12 flex items-center gap-2 px-6 py-2 rounded-md"
                      onClick={handleDelete}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.9815 18.3333C6.57083 18.3333 6.22127 18.1891 5.93283 17.9006C5.64439 17.6122 5.50016 17.2629 5.50016 16.8529V5.49994H4.5835V4.58327H8.25016V3.87744H13.7502V4.58327H17.4168V5.49994H16.5002V16.8529C16.5002 17.2745 16.359 17.6268 16.0767 17.9098C15.7943 18.1927 15.4417 18.3339 15.0188 18.3333H6.9815ZM15.5835 5.49994H6.41683V16.8529C6.41683 17.0172 6.46969 17.1523 6.57541 17.258C6.68113 17.3637 6.8165 17.4166 6.9815 17.4166H15.0197C15.1603 17.4166 15.2896 17.3579 15.4075 17.2406C15.5254 17.1233 15.5841 16.9937 15.5835 16.8519V5.49994ZM8.99083 15.5833H9.9075V7.33327H8.99083V15.5833ZM12.0928 15.5833H13.0095V7.33327H12.0928V15.5833Z"
                          fill="#DB222A"
                        />
                      </svg>
                      <p className="text-red-400 lg:block hidden">Delete</p>
                    </button>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacesList;
