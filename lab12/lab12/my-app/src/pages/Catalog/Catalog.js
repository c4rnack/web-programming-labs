import React, { useEffect, useState } from 'react';
import './Catalog.css';

import Dropdown from '../../components/Dropdown/Dropdown';
import Search from '../../components/Search/Search';
import HotelCard from '../../components/HotelCard/HotelCard';
import { getHotelsCatalog } from '../../API/api';
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';

function Catalog() {
  useEffect(() => {
    document.title = 'BookAHotel - catalog'
  }, [])

  const [hotels, setHotels] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('None');
  const [priceRange, setPriceRange] =  useState('None');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getHotelsCatalog(sortBy, priceRange, searchQuery)
    .then(response => setHotels(response.data))
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
  }, [searchQuery, sortBy, priceRange])

  return (
    <>
    <Navbar/>
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
      {isLoading && (<Loader/>)}
      {!isLoading && (
        <div className='catalog-grid'>
          {hotels.map(hotel => (<HotelCard key={hotel.id} hotel={hotel} />))}
        </div>)}
    </div>
    </>
  )
}

export default Catalog
