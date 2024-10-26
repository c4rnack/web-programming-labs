import React from 'react';
import icon from '../../assets/icon.svg';
import {NavLink} from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
      <img src={icon} className='icon' alt='icon'/>
        <nav>
            <ul>
                <li><NavLink to="/" className='link'>Home</NavLink></li>
                <li><NavLink to="/catalog" className='link'>Catalog</NavLink></li>
                <li><NavLink to="/cart" className='link'>Cart</NavLink></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
