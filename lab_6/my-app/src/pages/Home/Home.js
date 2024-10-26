import React, {useEffect} from 'react';
import hotel_image from '../../assets/hotel_image.jpg';
import './Home.css';
import HotelCard from '../../components/HomeHotelCard/HotelCard';
import { hotels } from '../../HotelList';

function Home() {
  useEffect(() => {
    document.title = 'BookAHotel - home page'
  })
  return (
    <div className='home'>
      <div className='hero'>
        <img className='hero-image' src={hotel_image} alt='hotel'/>
        <div className='hero-text'>
          <h1>BookAHotel</h1>
          <p>
          Discover your dream getaway with our easy-to-use hotel booking platform.
          From budget-friendly options to luxury retreats, we offer a vast selection of accommodations worldwide.
          Search by destination, dates, or amenities to find the perfect hotel for your next adventure.
          Book your stay today and experience hassle-free travel planning.
          </p>
        </div>
      </div>
      <div className='hotel__grid'>
        <HotelCard hotelName={hotels[0].name} hotelDesc={hotels[0].description} />
        <HotelCard hotelName={hotels[1].name} hotelDesc={hotels[1].description} />
        <HotelCard hotelName={hotels[2].name} hotelDesc={hotels[2].description} />
      </div>
      <button className='viewmore__button'>View more</button>
    </div>
  )
}

export default Home
