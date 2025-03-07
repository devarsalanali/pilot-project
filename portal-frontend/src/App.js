// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cameras from './pages/Cameras';
import Alerts from './pages/Alerts';
import Faces from './pages/Faces';
import AlertsWebSocket from './components/AlertsWebSocket';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
          <li>
            <Link to="/cameras">Cameras</Link>
          </li>
          <li>
            <Link to="/alerts">Alerts</Link>
          </li>
          <li>
            <Link to="/faces">Faces</Link>
          </li>
          <li>
            <Link to="/alerts-ws">Real-Time Alerts</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/cameras" element={<Cameras />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/faces" element={<Faces />} />
        <Route path="/alerts-ws" element={<AlertsWebSocket />} />
      </Routes>
    </Router>
  );
}

export default App;
