import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Faces() {
  const [faces, setFaces] = useState([]);
  const [newFace, setNewFace] = useState({
    name: '',
    image: '', // Will store a base64-encoded image string
    extra_data: '',
  });

  // Fetch known faces when the component mounts
  useEffect(() => {
    fetchFaces();
  }, []);

  const fetchFaces = async () => {
    try {
      const response = await api.get('/faces');
      setFaces(response.data);
    } catch (error) {
      console.error('Error fetching faces:', error);
    }
  };

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

  // Handle changes in form inputs
  const handleNewFaceChange = async (e) => {
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

  // Handle form submission to add a new face
  const handleNewFaceSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/faces/', newFace);
      fetchFaces(); // Refresh the list after adding
      setNewFace({ name: '', image: '', extra_data: '' });
    } catch (error) {
      console.error('Error creating face:', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Known Faces</h2>
      <ul>
        {faces.map((face) => (
          <li key={face.id} style={{ marginBottom: '1rem' }}>
            <strong>{face.name}</strong>
            <br />
            {face.extra_data && <span>Extra Data: {face.extra_data}</span>}
            <br />
            {face.image && (
              <img
                src={`data:image/jpeg;base64,${face.image}`}
                alt={face.name}
                style={{ width: '200px', marginTop: '0.5rem' }}
              />
            )}
          </li>
        ))}
      </ul>

      <h3>Add New Face</h3>
      <form onSubmit={handleNewFaceSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newFace.name}
            onChange={handleNewFaceChange}
            required
          />
        </div>
        <div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleNewFaceChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="extra_data"
            placeholder="Extra Data (optional)"
            value={newFace.extra_data}
            onChange={handleNewFaceChange}
          />
        </div>
        <button type="submit">Add Face</button>
      </form>
    </div>
  );
}

export default Faces;
