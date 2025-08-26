import React, { useState, useEffect } from 'react';
import './Dining.css';

function Dining() {
  const [diningData, setDiningData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All Locations');
  const apiURL = 'https://api.sfuhub.ca/dining/restaurants';

  useEffect(() => {
    const pullJson = async () => {
      const response = await fetch(apiURL);
      const responseData = await response.json();
      setDiningData(responseData);
    };
    pullJson();
  }, []);

  const handleLocationClick = (locationName) => {
    setSelectedLocation(selectedLocation === locationName ? null : locationName);
  };

  const handleDropdownChange = (event) => {
    setSelectedFilter(event.target.value);
    setSelectedLocation(null);
  };

  const filteredLocations = diningData.filter((location) => {
    return selectedFilter === 'All Locations' || location.category === selectedFilter;
  });

  return (
    <div className="dining">
      <h1 className="dining_header">Dining Options</h1>
      <div className="dining_content">
        <h2>Select a Dining Option:</h2>
        <div className="top-panel">
          <select className="location_selector" onChange={handleDropdownChange}>
            <option value="All Locations">All Locations</option>
            <option value="UniverCity">UniverCity</option>
            <option value="West Mall">West Mall</option>
            <option value="AQ">AQ</option>
            <option value="Residence">Residence</option>
          </select>
        </div>
      </div>
      <div className="dining_main">
        <div className="left-panel">
          {filteredLocations.map((location, index) => (
            <button
              key={index}
              className={`location-btn ${selectedLocation === location.name ? 'active' : ''}`}
              onClick={() => handleLocationClick(location.name)}
            >
              <label>{location.name}</label>
            </button>
          ))}
        </div>
        <div className={`right-panel ${selectedLocation ? 'active' : ''}`}>
          {selectedLocation &&
            filteredLocations
              .filter((location) => location.name === selectedLocation)
              .map((location, index) => (
                <div key={index} className="location_details">
                  <h3>{location.name}</h3>
                  <p>Address: {location.address}</p>
                  <p>Contact: {location.contact}</p>
                  <p>Category: {location.category}</p>
                  <p>Description: {location.description}</p>
                  <p>Hours of Operation: {location.hours}</p>
                  <p>
                    Menu Link: <a href={location.menu} target="_blank" rel="noopener noreferrer">View Menu</a>
                  </p>
                  {location.image && (
                    <div
                      className="location_image"
                      style={{ backgroundImage: `url(${location.image})` }}
                    />
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Dining;
