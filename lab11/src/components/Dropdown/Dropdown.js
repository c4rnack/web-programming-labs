import React from 'react';
import './Dropdown.css';

function Dropdown({ options, onChange }) {

    const handleChange= (event) => {
        onChange(event.target.value)
    }

    return (
        <select onChange={handleChange} className='dropdown'>
            {options.map(option => (<option key={option} className='dropdown-option' value={option}>{option}</option>))}
        </select>
    )
}

export default Dropdown
