import React, { useState } from 'react';
import { FaTrain, FaBus } from 'react-icons/fa'; 
import './Route.css';

function Route() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [routes, setRoutes] = useState([]);
  const [travelMode, setTravelMode] = useState('all');
  const [error, setError] = useState('');

  const routeOptions = [
    // SFU Surrey to SFU Vancouver
    {
      from: 'SFU Surrey',
      to: 'SFU Vancouver',
      time: '11:09 p.m. - 12:01 a.m.',
      transit: ' Expo Line, Bus 16',
      duration: '53 min',
      mode: 'train',
      details: 'Take the Expo Line from Surrey Central to Production Way, then transfer to Bus 16 to SFU Vancouver.',
    },
    {
      from: 'SFU Surrey',
      to: 'SFU Vancouver',
      time: '10:57 p.m. - 11:55 p.m.',
      transit: ' Expo Line, Millennium Line, and Bus',
      duration: '58 min',
      mode: 'train',
      details: 'Take the Expo Line, transfer at Lougheed for the Millennium Line, and then take the Bus 9 to SFU Vancouver.',
    },
    {
      from: 'SFU Surrey',
      to: 'SFU Vancouver',
      time: '11:30 p.m. - 12:30 a.m.',
      transit: 'Bus 145 only',
      duration: '1 hr',
      mode: 'bus',
      details: 'Direct Bus 145 from SFU Surrey to SFU Vancouver.',
    },
    {
      from: 'SFU Vancouver',
      to: 'SFU Surrey',
      time: '11:09 p.m. - 12:01 a.m.',
      transit: ' Expo Line, Bus 16',
      duration: '53 min',
      mode: 'train',
      details: 'Take the Bus 16 and then Expo Line from Production Way to SFU Surrey.',
    },
    {
      from: 'SFU Vancouver',
      to: 'SFU Surrey',
      time: '10:57 p.m. - 11:55 p.m.',
      transit: ' Expo Line, Millennium Line, and Bus',
      duration: '58 min',
      mode: 'train',
      details: 'Take the Bus 9 and then the Expo Line to SFU Surrey.',
    },
    {
      from: 'SFU Vancouver',
      to: 'SFU Surrey',
      time: '11:30 p.m. - 12:30 a.m.',
      transit: ' Bus 145 only',
      duration: '1 hr',
      mode: 'bus',
      details: 'Direct Bus 145 from SFU Vanccouver to SFU Surrey.',
    },
    // SFU Burnaby to SFU Vancouver
    {
      from: 'SFU Burnaby',
      to: 'SFU Vancouver',
      time: '9:00 a.m. - 9:30 a.m.',
      transit: ' Millennium Line, Bus R5',
      duration: '30 min',
      mode: 'train',
      details: 'Take the Millennium Line and transfer to Bus R5 to SFU Vancouver.',
    },
    {
      from: 'SFU Burnaby',
      to: 'SFU Vancouver',
      time: '8:30 a.m. - 9:15 a.m.',
      transit: ' Bus R5',
      duration: '45 min',
      mode: 'bus',
      details: 'Take Bus R5 directly from SFU Burnaby to SFU Vancouver.',
    },
    {
      from: 'SFU Vancouver',
      to: 'SFU Burnaby',
      time: '9:00 a.m. - 9:30 a.m.',
      transit: ' Millennium Line, Bus R5',
      duration: '30 min',
      mode: 'train',
      details: 'Take Bus R5 and then the Millennium Line to SFU Burnaby.',
    },
    {
      from: 'SFU Vancouver',
      to: 'SFU Burnaby',
      time: '8:30 a.m. - 9:15 a.m.',
      transit: ' Bus R5',
      duration: '45 min',
      mode: 'bus',
      details: 'Take Bus R5 directly from SFU Vancouver to SFU Burnaby.',
    },
    // SFU Surrey to SFU Burnaby
    {
      from: 'SFU Surrey',
      to: 'SFU Burnaby',
      time: '12:15 p.m. - 1:05 p.m.',
      transit: ' Expo Line, Bus 145',
      duration: '50 min',
      mode: 'train',
      details: 'Take the Expo Line to Production Way, then Bus 145 to SFU Burnaby.',
    },
    {
      from: 'SFU Surrey',
      to: 'SFU Burnaby',
      time: '1:00 p.m. - 1:50 p.m.',
      transit: ' Bus 144',
      duration: '50 min',
      mode: 'bus',
      details: 'Direct Bus 144 from SFU Surrey to SFU Burnaby.',
    },
    {
      from: 'SFU Burnaby',
      to: 'SFU Surrey',
      time: '12:15 p.m. - 1:05 p.m.',
      transit: ' Expo Line, Bus 145',
      duration: '50 min',
      mode: 'train',
      details: 'Take Bus 145, then the Expo Line to Production Way to SFU Surrey.',
    },
    {
      from: 'SFU Burnaby',
      to: 'SFU Surrey',
      time: '1:00 p.m. - 1:50 p.m.',
      transit: ' Bus 144',
      duration: '50 min',
      mode: 'bus',
      details: 'Direct Bus 144 from SFU Burnaby to SFU Surrey.',
    }
  ];

  const handleGetRoutes = () => {
    if (from && to) {
      const filteredRoutes = routeOptions.filter(route =>
        route.from === from &&
        route.to === to &&
        (travelMode === 'all' || route.mode === travelMode)
      );
      setRoutes(filteredRoutes);
      setError(filteredRoutes.length > 0 ? '' : 'No routes found for the selected campuses and travel mode.');
    } else {
      setError('Please select both the starting and destination campuses.');
    }
  };

  return (
    <div className="route-container">
      <h1>Find Best Routes Between SFU Campuses</h1>

      {/* Dropdown for "From" campus */}
      <div className="input-group">
        <label>FROM:</label>
        <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ fontSize: '1.2rem', color: '#000000' }}>
          <option value="" disabled>Select starting campus</option>
          <option value="SFU Surrey">SFU Surrey</option>
          <option value="SFU Vancouver">SFU Vancouver</option>
          <option value="SFU Burnaby">SFU Burnaby</option>
        </select>
      </div>

      {/* Dropdown for "To" campus */}
      <div className="input-group">
        <label>TO:</label>
        <select value={to} onChange={(e) => setTo(e.target.value)} style={{ fontSize: '1.2rem', color: '#000000' }}>
          <option value="" disabled>Select destination campus</option>
          <option value="SFU Surrey">SFU Surrey</option>
          <option value="SFU Vancouver">SFU Vancouver</option>
          <option value="SFU Burnaby">SFU Burnaby</option>
        </select>
      </div>

      {/* Dropdown for travel mode */}
      <div className="input-group">
        <label>TRAVEL MODE:</label>
        <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)} style={{ fontSize: '1.2rem', color: '#000000' }}>
          <option value="all">All</option>
          <option value="train">Train</option>
          <option value="bus">Bus</option>
        </select>
      </div>

      <button onClick={handleGetRoutes}>Get Best Routes</button>
      {error && <p className="error">{error}</p>}

      <div className="routes-list">
        {routes.length > 0 ? (
          routes.map((route, index) => (
            <div key={index} className="route-item">
              <h3>{route.time}</h3>
              <p>
                <strong>Transit Options:</strong>
                {route.transit.includes('Expo Line') && <FaTrain />} 
                {route.transit.includes('Bus') && <FaBus />} 
                {route.transit}
              </p>
              <p><strong>Estimated Duration:</strong> {route.duration}</p>
              <button onClick={() => alert(route.details)}>Show Details</button>
            </div>
          ))
        ) : (
          <p>No routes available. Please adjust your selection.</p>
        )}
      </div>
    </div>
  );
}

export default Route;
