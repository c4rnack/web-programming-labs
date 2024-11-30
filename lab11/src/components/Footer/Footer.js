import React from 'react';
import './Footer.css';
import logo from '../../assets/icon.svg';
import facebook from '../../assets/facebook_icon.svg';
import twitter from '../../assets/twitter_icon.svg';
import linkedin from '../../assets/linkedin_icon.svg';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-text'>
            <h3>BookAHotel</h3>
            <p>Trusted by travelers worldwide</p>
        </div>
        <img src={logo} className='logo' alt='logo' />
        <ul className='socials-links'>
            <li><a href='https://www.facebook.com/'><img className='socials-icon' src={facebook} alt='facebook'/></a></li>
            <li><a href='https://x.com/'><img className='socials-icon' src={twitter} alt='twitter'/></a></li>
            <li><a href='https://www.linkedin.com/'><img className='socials-icon' src={linkedin} alt='linkedin'/></a></li>
        </ul>
      </div>
      <p className='copyright'>2024 IoT © Copyright all rights reserved, bla bla</p>
    </footer>
  )
}

export default Footer
