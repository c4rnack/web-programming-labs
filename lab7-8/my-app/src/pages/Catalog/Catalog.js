import React, { useContext, useEffect, useState } from 'react';
import './Catalog.css';
import { HotelContext } from '../../HotelList';

import Dropdown from '../../components/Dropdown/Dropdown';
import Search from '../../components/Search/Search';
import HotelCard from '../../components/HotelCard/HotelCard';

function Catalog() {
  useEffect(() => {
    document.title = 'BookAHotel - catalog'
  }, [])

  const hotels = useContext(HotelContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('None');
  const [priceRange, setPriceRange] =  useState('None');

  let filteredHotels = hotels.filter(hotel => {
    const hotelName = hotel.name.toLowerCase().replace(/\s/g, '');
    const searchCondition = hotelName.includes(searchQuery.toLowerCase().replace(/\s/g, ''));
    let priceCondition;
    switch (priceRange) {
      case 'less then 50$':
        priceCondition = hotel.priceForNight < 50;
        break;
      case '50$ - 100$':
        priceCondition = hotel.priceForNight >= 50 && hotel.priceForNight <= 100;
        break;
      case '100$ - 150$':
        priceCondition = hotel.priceForNight >= 100 && hotel.priceForNight <= 150;
        break;
      case '150$ - 200$':
        priceCondition = hotel.priceForNight >= 150 && hotel.priceForNight <= 200;
        break;
      case '200$ and more':
        priceCondition = hotel.priceForNight >= 200;
        break;
      default:
        priceCondition = true;
    }
    return searchCondition && priceCondition;
  });

  if (sortBy === 'Name') {
    filteredHotels.sort((a, b) => {
      if (a.name > b.name) return 1;
      else return -1;
    })
  }
  else if (sortBy === 'Price') {
    filteredHotels.sort((a,b) => a.priceForNight - b.priceForNight)
  }

  return (
    <div className='catalog'>
      <div className='search-bar'>
        <div className='filters'>
          <div className='filters-dropdown'>
            <label>Sort by:</label>
            <Dropdown onChange={setSortBy} options={['None','Name', 'Price']} />
          </div>
          <div className='filters-dropdown'>
            <label>Choose a price range:</label>
            <Dropdown onChange={setPriceRange} options={['None', 'less then 50$',
              '50$ - 100$','100$ - 150$','150$ - 200$', '200$ and more']} />
          </div>
        </div>
        <Search onChange={setSearchQuery}/>
      </div>
      <div className='catalog-grid'>
        {filteredHotels.map(hotel => (<HotelCard key={hotel.id} hotel={hotel} />))}
      </div>
    </div>
  )
}

export default Catalog
