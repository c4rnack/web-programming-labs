import React from 'react';
import './HotelCard.css';
import cardImage from '../../assets/hotel_card_image.jpg';
import { Link } from 'react-router-dom';

function HotelCard({hotel}) {
  return (
    <div className='hotel__card'>
      <img className='hotel__card-image' src={cardImage} alt='hotel'/>
      <div className='hotel__card-text'>
        <h3>{hotel.name}</h3>
        <p>{hotel.description}</p>
        <p><b>Price for night: {hotel.priceForNight}$</b></p>
      </div>
      <Link className='hotel__card-button' to={`/item/${hotel.id}`}>View more</Link>
    </div>
  )
}

export default HotelCard
