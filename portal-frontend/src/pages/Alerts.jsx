import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch alerts from the backend
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/alerts/');
      setAlerts(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError('Error fetching alerts');
    } finally {
      setLoading(false);
    }
  };

  // Poll the alerts endpoint every 5 seconds
  useEffect(() => {
    fetchAlerts(); // initial fetch
    const intervalId = setInterval(fetchAlerts, 5000); // adjust interval as needed
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Alerts</h2>
      {loading && <p>Loading alerts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id} style={{ marginBottom: '1rem' }}>
            <p>
              <strong>Camera ID:</strong> {alert.camera_id}
            </p>
            <p>
              <strong>Time:</strong>{' '}
              {new Date(alert.timestamp).toLocaleString()}
            </p>
            <p>
              <strong>Description:</strong> {alert.description}
            </p>
            <p>
              <strong>Confidence:</strong> {alert.confidence}
            </p>
            {alert.face_snapshot && (
              <img
                src={`data:image/jpeg;base64,${alert.face_snapshot}`}
                alt="Alert snapshot"
                style={{ width: '200px', marginTop: '0.5rem' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alerts;
