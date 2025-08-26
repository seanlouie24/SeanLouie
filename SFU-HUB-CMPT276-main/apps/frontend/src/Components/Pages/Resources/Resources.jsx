import React, { useState, useEffect } from 'react';
import './resources.css';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [resources, setResources] = useState([]);

  const apiURL = 'https://api.sfuhub.ca/resources';

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(apiURL);
      const responseData = await response.json();
      setResources(responseData);
    };
    fetchData();
  }, []);

    const filteredResources = resources.filter((resource) => {
    const matchesCategory = category === 'all' || resource.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="resources__container">
      <h1 className="resources__header">SFU Resources</h1>
      <h2 htmlFor="searchBar">Search Resources:</h2>
      <input
        type="text"
        id="searchBar"
        className="resources__search-bar"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h2 htmlFor="categoryFilter">Select Category:</h2>
      <select
        id="categoryFilter"
        className="resources__category-filter"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="Wellness">Wellness</option>
        <option value="Tech">Tech</option>
        <option value="School">School</option>
        <option value="Map">Map</option>
        <option value="Sports">Sports</option>
        <option value="SocialMedia">Social Media</option>
      </select>
      <ul className="resources__list">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <li key={resource.title} className="resources__item" data-category={resource.category}>
              <label>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  {resource.title}
                </a>
              </label>
            </li>
          ))
        ) : (
          <li className="resources__no-results">No resources found for "{searchTerm}". Try searching with a different keyword.</li>
        )}
      </ul>
    </div>
  );
};

export default Resources;
