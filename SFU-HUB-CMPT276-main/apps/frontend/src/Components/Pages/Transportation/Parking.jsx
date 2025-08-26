import React, { useState } from 'react';
import './Parking.css';

const Parking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  // List of SFU parking spots
  const parkingSpots = [
    { name: 'Students', link: 'https://www.sfu.ca/parking/Parking/students.html', category: 'Students' },
    { name: 'Student Residents', link: 'https://www.sfu.ca/parking/Parking/StudentResidentParking.html', category: 'Student Residents' },
    { name: 'Faculty + Staff', link: 'https://www.sfu.ca/parking/Parking/faculty---staff.html', category: 'Faculty + Staff' },
    { name: 'Visitors', link: 'https://www.sfu.ca/parking/Parking/visitors.html', category: 'Visitors' },
    { name: 'Contractors and External Employees', link: 'https://www.sfu.ca/parking/Parking/Contractors--External--Employees.html', category: 'Contractors and External Employees' },
    { name: 'Parking Regulations', link: 'https://www.sfu.ca/parking/Parking/parking-regulations.html', category: 'Parking Regulations' },
    { name: 'Surrey Parking', link: 'https://www.sfu.ca/parking/Parking/Surrey--Parking.html', category: 'Surrey Parking' },
    { name: 'Downtown Campus Parking', link: 'https://www.sfu.ca/vancouver/about/getting-here.html', category: 'Downtown Campus Parking' },
  ];

  const filteredParkingSpots = parkingSpots.filter((spot) => {
    const matchesCategory = category === 'all' || spot.category === category;
    const matchesSearch = spot.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="parking__container">
      <h1 className="parking__header">SFU Parking Information</h1>

      <h2 htmlFor="categoryFilter">Select Category:</h2>
      <select
        id="categoryFilter"
        className="parking__category-filter"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="Students">Students</option>
        <option value="Student Residents">Student Residents</option>
        <option value="Faculty + Staff">Faculty + Staff</option>
        <option value="Visitors">Visitors</option>
        <option value="Contractors and External Employees">Contractors and External Employees</option>
        <option value="Parking Regulations">Parking Regulations</option>
        <option value="Surrey Parking">Surrey Parking</option>
        <option value="Downtown Campus Parking">Downtown Campus Parking</option>
      </select>

      <ul className="parking__list">
        {filteredParkingSpots.length > 0 ? (
          filteredParkingSpots.map((spot) => (
            <li key={spot.name} className="parking__item" data-category={spot.category}>
              <a href={spot.link} target="_blank" rel="noopener noreferrer">
                {spot.name}
              </a>
            </li>
          ))
        ) : (
          <li className="parking__no-results">No parking spots found for "{searchTerm}". Try a different search.</li>
        )}
      </ul>

      <div className="parking__map-container">
        <iframe
          title="SFU Parking Map"
          src="https://www.google.com/maps/d/embed?mid=1ZFOvJ18UpxyFhPHmLQxNYOzatNc&ehbc=2E312F"
          width="100%"
          height="600"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Parking;
