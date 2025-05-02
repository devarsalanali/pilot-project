import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const CameraList = () => {
  const [cameras, setCameras] = useState([]);
  const fetchCameras = async () => {
    try {
      const response = await api.get('/cameras/');
      setCameras(response.data);
    } catch (error) {
      console.error('Error fetching cameras:', error);
    }
  };

  const handleSelectAllChange = (e) => {
    const newSelected = e.target.checked;
    setCameras(cameras.map((camera) => ({ ...camera, selected: newSelected })));
  };

  const handleSelectChange = (index, e) => {
    const newCameras = [...cameras];
    newCameras[index].selected = e.target.checked;
    setCameras(newCameras);
  };

  const handleDelete = () => {
    setCameras(cameras.filter((camera) => !camera.selected));
  };

  useEffect(() => {
    fetchCameras();
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
            checked={cameras.every((camera) => camera.selected)}
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
            <tr className="bg-[#F8F8F8] h-16 text-sm font-light text-gray-500">
              <th className="border border-l-gray-200  border-white border-b-gray-200 border-t-gray-200  p-2"></th>
              <th className="border border-white border-b-gray-200 border-t-gray-200 lg:text-md sm:text-sm text-[10px] lg:p-2 font-semibold">
                ID
              </th>
              <th className="border border-white border-b-gray-200 border-t-gray-200 lg:text-md sm:text-sm text-[10px]  font-semibold lg:p-6  lg:table-cell hidden ">
                Snap
              </th>
              <th className="border border-white border-b-gray-200 border-t-gray-200 lg:text-md sm:text-sm text-[10px]  font-semibold lg:p-6  lg:table-cell hidden ">
                Name
              </th>
              <th className="border border-white border-b-gray-200 border-t-gray-200 lg:text-md sm:text-sm text-[10px]  font-semibold lg:p-6  lg:table-cell hidden ">
                Location
              </th>
              <th className="border border-white border-b-gray-200 border-t-gray-200 lg:text-md sm:text-sm text-[10px]  lg:p-6 font-semibold lg:table-cell hidden ">
                RTSP URL
              </th>
              <th className="border border-white border-b-gray-200 border-t-gray-200 lg:text-md sm:text-sm text-[10px]  lg:p-2 font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {cameras.map((camera, index) => (
              <tr
                key={index}
                className="h-16 text-sm text-gray-500 font-light text-center"
              >
                <td className="border p-2">
                  <input
                    type="checkbox"
                    className="border-none"
                    name="check"
                    checked={camera.selected}
                    onChange={(e) => handleSelectChange(index, e)}
                  />
                </td>
                <td className="border lg:p-2 lg:text-md sm:text-sm text-[10px]">
                  {index}
                </td>
                <td className="border lg:p-2 lg:text-md sm:text-sm text-[10px]">
                  <img
                    src={
                      camera.snap
                        ? camera.snap
                        : 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                    alt=""
                    className="size-16"
                  />
                </td>
                <td className="border lg:p-2 lg:text-md sm:text-sm text-[10px]">
                  {camera.name}
                </td>
                <td className="border lg:text-md sm:text-sm text-[10px] lg:p-6 lg:table-cell hidden ">
                  {camera.location}
                </td>
                <td className="border lg:text-md sm:text-sm text-[10px] lg:p-6 lg:table-cell  ">
                  {camera.rtsp_url}
                </td>
                <td
                  className={`border lg:p-2 lg:text-md sm:text-sm text-[10px] ${
                    camera.status === 'Online'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {camera.status ? camera.status : 'None'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CameraList;
