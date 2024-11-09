import React, {useContext, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import { HotelContext } from '../../HotelList';
import hotelImage from '../../assets/hotel_card_image.jpg';

import './Item.css'
import Dropdown from '../../components/Dropdown/Dropdown';
import NumberInput from '../../components/NumberInput/NumberInput';

function Item() {
    const {id} = useParams();

    const hotels = useContext(HotelContext);
    const foundHotel = hotels.find(el => el.id === id);

    const [roomTypePrice, setRoomTypePrice] = useState(1);
    const [amountOfRooms, setAmountOfRooms] = useState(0);

    if (!foundHotel) {
        return (<div>Hotel not found</div>)
    }

    document.title = `BookAHotel - ${foundHotel.name}`;

    const roomTypeChange = (type) => {
        if (type === 'Single room') {
            setRoomTypePrice(1);
        }
        else {
            setRoomTypePrice(2);
        }
    }

    const amountOfRoomsChange = (amount) => {
        setAmountOfRooms(amount);
    }

    return (
    <div className='item'>
      <div className='item-hotel__info'>
        <img className='item-image' src={hotelImage} alt='hotel'/>
        <div className='item-text'>
            <h1>{foundHotel.name}</h1>
            <p>{foundHotel.description}</p>
            <div className='item-filters'>
                <div className='item-dropdown__menu'>
                    <label>Choose room type:</label>
                    <Dropdown onChange={roomTypeChange} options={['Single room', 'Double room']}/>
                </div>
                <div className='item-number__input'>
                    <label>Enter the number of rooms:</label>
                    <NumberInput onChange={amountOfRoomsChange}/>
                </div>
            </div>
        </div>
      </div>
      <div className='item-price__and__navigation'>
        <h2>Total price: {foundHotel.priceForNight * amountOfRooms * roomTypePrice}$</h2>
        <nav>
            <Link className='item-nav__button' to='/catalog'>Go back</Link>
            <Link className='item-nav__button' to='/cart'>Add to cart</Link>
        </nav>
      </div>
    </div>
  )
}

export default Item
