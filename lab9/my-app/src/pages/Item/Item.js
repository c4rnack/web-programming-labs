import React, { useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import hotelImage from '../../assets/hotel_card_image.jpg';

import './Item.css'
import Dropdown from '../../components/Dropdown/Dropdown';
import NumberInput from '../../components/NumberInput/NumberInput';
import Loader from '../../components/Loader/Loader';
import { getHotelItem } from '../../API/api';

function Item() {
    const {id} = useParams();
    const [hotel, setHotel] = useState(null);
    const [roomTypePrice, setRoomTypePrice] = useState(1);
    const [amountOfRooms, setAmountOfRooms] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            await getHotelItem(id).then(response => setHotel(response.data)).finally(() => {
                console.log(isLoading);
                setIsLoading(false);
            });
        }
        getData();
    }, []);

    if (isLoading) {
        return (<Loader/>)
    }

    if (!hotel) {
        return (<div>Hotel not found</div>)
    }

    document.title = `BookAHotel - ${hotel.name}`;

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
            <h1>{hotel.name}</h1>
            <p>{hotel.description}</p>
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
        <h2>Total price: {hotel.priceForNight * amountOfRooms * roomTypePrice}$</h2>
        <nav>
            <Link className='item-nav__button' to='/catalog'>Go back</Link>
            <Link className='item-nav__button' to='/cart'>Add to cart</Link>
        </nav>
      </div>
    </div>
  )
}

export default Item
