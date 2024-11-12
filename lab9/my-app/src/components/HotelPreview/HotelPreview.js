import React from 'react';
import card_image from '../../assets/hotel_card_image.jpg';
import './HotelPreview.css'

function HotelPreview({hotelName, hotelDesc}) {
  return (
    <div className='hotel__preview'>
      <img className='hotel__preview-image' alt='hotel' src={card_image} />
      <div className='hotel__preview-text'>
        <h3>{hotelName}</h3>
        <p>{hotelDesc}</p>
      </div>
    </div>
  )
}

export default HotelPreview
