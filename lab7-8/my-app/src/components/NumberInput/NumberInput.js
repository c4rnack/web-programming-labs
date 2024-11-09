import React from 'react';
import './NumberInput.css';

function NumberInput({ onChange }) {

    const handleChange = (event) => {
      if (event.target.value === '') {
        onChange(0);
      }
      else {
        onChange(parseInt(event.target.value))
      }
    };

    return (
    <input className='number-input' onChange={handleChange} min={0} type='number' placeholder='Enter...'/>
  )
}

export default NumberInput
