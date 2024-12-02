import React from 'react';
import checkImage from '../../assets/check.svg';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Success.css';

function Success() {
  document.title = 'RentAHotel - success' 
  return (
    <>
    <Navbar/>
    <div className="success">
      <img src={checkImage} alt='check'/>
      <h1 className="success_title">Success!</h1>
      <div className="success_text">
        <p>Your order was sent to processing!</p>
        <p>Check your e-mail box for further information.</p>
      </div>
      <Link to="/catalog">
        <button className="back_to_catalog">Back to catalog</button>
      </Link>
    </div>
    </>
  )
}

export default Success
