// src/components/AlertsWebSocket.jsx
import React, { useState, useEffect } from 'react';

function AlertsWebSocket() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/alerts');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setAlerts(data.alerts);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Real-Time Alerts</h2>
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
            {alert.face_snapshot && (
              <img
                src={`data:image/jpeg;base64,${alert.face_snapshot}`}
                alt="Alert Snapshot"
                style={{ width: '200px', marginTop: '0.5rem' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlertsWebSocket;
