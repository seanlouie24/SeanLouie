import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from "./calendar";
import './Home.css';
import blogImage from './home-pics/blog.jpg';
import diningImage from './home-pics/dining.jpg';
import resourcesImage from './home-pics/resources.jpg';
import transportationImage from './home-pics/transportation.jpg';

function Home() {
  return (
    <div>
      {/* hero section */}
      <section className="hero">
        <div className="hero-image"></div> {/* Image container */}
        <div className="hero-text">
          <h1 >SFU HUB</h1>
          <p>Your central hub for all things SFU</p>
        </div>
      </section>
      
      {/* image grid */}
      <section className="grid-image4">
        <div className="grid-item4">
          <Link to="/dining">
            <div className="image1" style={{ backgroundImage: `url(${diningImage})` }}></div>
            <div className="image-text4">DINING</div>
          </Link>
        </div>
        <div className="grid-item4">
          <Link to="/resources">
            <div className="image2" style={{ backgroundImage: `url(${resourcesImage})` }}></div>
            <div className="image-text4">RESOURCES</div>
          </Link>
        </div>
        <div className="grid-item4">
          <Link to="/transportation">
            <div className="image3" style={{ backgroundImage: `url(${transportationImage})` }}></div>
            <div className="image-text4">TRANSPORTATION</div>
          </Link>
        </div>
      </section>
      
      {/*calendar section*/}
      <section className='calendar-section'>
        <Calendar />
      </section>
    </div>
  );
}

export default Home;
