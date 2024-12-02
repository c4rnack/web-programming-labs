import React from 'react';
import icon from '../../assets/icon.svg';
import {NavLink, useNavigate} from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }
  return (
    <div className='navbar'>
      
        <nav>
            <ul>
                <li><img src={icon} className='icon' alt='icon'/></li>
                <li><NavLink to="/home" className='link'>Home</NavLink></li>
                <li><NavLink to="/catalog" className='link'>Catalog</NavLink></li>
                <li><NavLink to="/cart" className='link'>Cart</NavLink></li>
            </ul>
        </nav>
        <div className='user__panel'>
          <div className='user__info'>
            <p className='user__info-username'>{user.username}</p>
            <p className='user__info-email'>{user.email}</p>
          </div> 
          <button className='log__out-button' onClick={handleLogOut}>Log Out</button>
        </div>
    </div>
  )
}

export default Navbar
