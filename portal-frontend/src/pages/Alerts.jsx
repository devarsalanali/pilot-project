// src/pages/Alerts.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await api.get('/alerts/');
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Alerts</h2>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id}>
            {new Date(alert.timestamp).toLocaleString()} — Camera:{' '}
            {alert.camera_id} — {alert.description} (Confidence:{' '}
            {alert.confidence})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alerts;
