import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { NavBarData } from './NavBarData';
import './Navbar.css'
import { IconContext } from 'react-icons/lib';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: 'white' }}>
        <div className='navbar'>
          <Link to="/" className='navbar-link'>
        <h1 className='navbar-title'>SFU HUB</h1>
        </Link>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {NavBarData.map((item, index) => {
              return (
                <li key={index} className='nav-text ${item.cName}'>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;