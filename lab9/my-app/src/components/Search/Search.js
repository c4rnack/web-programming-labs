import React from 'react';
import './Search.css';

function Search({ onChange }) {

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input className='search-input' onChange={handleChange} placeholder='Enter to search...' />
  )
}

export default Search
