import React, { useEffect, useState} from 'react';
import './Home.css';

import hotel_image from '../../assets/hotel_image.jpg';
import HotelPreview from '../../components/HotelPreview/HotelPreview';
import { getHotelsHome } from '../../API/api';
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
  useEffect(() => {
    document.title = 'BookAHotel - home page';
  });

  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getHotelsHome()
    .then(response => setHotels(response.data))
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
  }, [])

  const [visibleCount, setVisibleCount] = useState(3);

  const viewMore = () => {
    setVisibleCount(visibleCount + 3);
  }

  const hideAll = () => {
    setVisibleCount(3);
  }
  return (
    <>
    <Navbar/>
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
      {isLoading && (<Loader/>)}
      {!isLoading && (<>
      <div className='hotel__grid'>
        {hotels.slice(0, visibleCount).map((hotel) => (
          <HotelPreview key={hotel.id} hotelName={hotel.name} hotelDesc={hotel.description}/>)
        )}
      </div>
      {visibleCount < hotels.length && (<button onClick={viewMore} className='viewmore__button'>View more</button>)}
      {visibleCount >= hotels.length && (<button onClick={hideAll} className='viewmore__button'>Hide all</button>)}
      </>)}
    </div>
    </>
  )
}

export default Home
