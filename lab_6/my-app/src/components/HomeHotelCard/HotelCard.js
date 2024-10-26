import React from 'react';
import card_image from '../../assets/hotel_card_image.jpg';
import './HotelCard.css'

function HotelCard({hotelName, hotelDesc}) {
  return (
    <div className='hotel__card'>
      <img className='hotel__card-image' alt='hotel' src={card_image} />
      <div className='hotel__card-text'>
        <h3>{hotelName}</h3>
        <p>{hotelDesc}</p>
      </div>
    </div>
  )
}

export default HotelCard
