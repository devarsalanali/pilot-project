// src/pages/Cameras.jsx
import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import Hls from 'hls.js';

function Cameras() {
  const videoRef = useRef(null);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [newCamera, setNewCamera] = useState({
    name: '',
    location: '',
    rtsp_url: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    fetchCameras();
    if (videoRef.current && Hls.isSupported()) {
      // Clean up any previous instance
      if (hlsInstance) {
        hlsInstance.destroy();
      }

      const hlsConfig = {
        maxBufferLength: 0.5, // 3 seconds of buffer
        maxMaxBufferLength: 3, // Cap at 3 seconds
      };

      const hls = new Hls(hlsConfig);
      // Example: http://localhost:8000/hls/camera_<camera_id>/index.m3u8
      const streamUrl =
        'http://localhost:8000/hls/camera_d11c139d-4a4e-4d69-b9b6-9a5e503b8b7b/index.m3u8';

      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Attempt to autoplay once the manifest is loaded
        videoRef.current.play().catch((err) => {
          console.warn('Autoplay was prevented:', err);
        });
      });

      setHlsInstance(hls);
    } else if (
      videoRef.current &&
      videoRef.current.canPlayType('application/vnd.apple.mpegurl')
    ) {
      // Some iOS Safari browsers support HLS without hls.js
      videoRef.current.src =
        'http://localhost:8000/hls/camera_6c21fe65-4324-4cf6-99bd-68a875ad298d/index.m3u8';
    }

    // Cleanup when the component unmounts or camera changes
    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, []);

  const fetchCameras = async () => {
    try {
      const response = await api.get('/cameras/');
      setCameras(response.data);
    } catch (error) {
      console.error('Error fetching cameras:', error);
    }
  };

  const handleChange = (e) => {
    setNewCamera({ ...newCamera, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/cameras/', newCamera);
      fetchCameras();
      setNewCamera({
        name: '',
        location: '',
        rtsp_url: '',
        username: '',
        password: '',
      });
    } catch (error) {
      console.error('Error creating camera:', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Cameras</h2>
      <ul>
        {cameras.map((camera) => (
          <li key={camera.id}>
            <strong>{camera.name}</strong> — {camera.location} —{' '}
            {camera.rtsp_url}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1rem' }}>
        <video
          ref={videoRef}
          width="480"
          height="270"
          controls
          style={{ backgroundColor: 'black' }}
        />
      </div>
      <h3>Add New Camera</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={newCamera.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="location"
          value={newCamera.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          name="rtsp_url"
          value={newCamera.rtsp_url}
          onChange={handleChange}
          placeholder="RTSP URL"
          required
        />
        <input
          name="username"
          value={newCamera.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          value={newCamera.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Add Camera</button>
      </form>
    </div>
  );
}

export default Cameras;
