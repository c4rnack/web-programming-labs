import React, {useContext, useEffect, useState} from 'react';
import './Home.css';
import { HotelContext } from '../../HotelList';

import hotel_image from '../../assets/hotel_image.jpg';
import HotelPreview from '../../components/HotelPreview/HotelPreview';

function Home() {
  useEffect(() => {
    document.title = 'BookAHotel - home page'
  })

  const hotels = useContext(HotelContext);
  const [visibleCount, setVisibleCount] = useState(3);

  const viewMore = () => {
    setVisibleCount(visibleCount + 3);
  }

  const hideAll = () => {
    setVisibleCount(3);
  }
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
        {hotels.slice(0, visibleCount).map((hotel) => (
          <HotelPreview key={hotel.id} hotelName={hotel.name} hotelDesc={hotel.description}/>)
        )}
      </div>
      {visibleCount < hotels.length && (<button onClick={viewMore} className='viewmore__button'>View more</button>)}
      {visibleCount >= hotels.length && (<button onClick={hideAll} className='viewmore__button'>Hide all</button>)}
    </div>
  )
}

export default Home
