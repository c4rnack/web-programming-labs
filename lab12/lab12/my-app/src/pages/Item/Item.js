import React, { useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { getHotelItem, postCart } from '../../API/api';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../Redux/CartSlice.js';

import hotelImage from '../../assets/hotel_card_image.jpg';
import './Item.css'
import Dropdown from '../../components/Dropdown/Dropdown';
import NumberInput from '../../components/NumberInput/NumberInput';
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar.js';


function Item() {
    const {id} = useParams();

    const [hotel, setHotel] = useState(null);
    const [roomType, setRoomType] = useState('Single room');
    const [roomTypePrice, setRoomTypePrice] = useState(1);
    const [amountOfRooms, setAmountOfRooms] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            await getHotelItem(id)
            .then(response => setHotel(response.data))
            .finally(() => setIsLoading(false));
        }
        getData();
    }, [id]);

    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const addToCart = async () => {
        if (amountOfRooms <= 0) {
            return alert("Enter number of rooms")
        }
        const existingHotel = cart.find(item => item.id === id && item.roomType === roomType);
        let updatedCart;
        if (existingHotel) {
            updatedCart = cart.map(item => {
                if (item => item.id === id && item.roomType === roomType) {
                    item = {...item, amount: item.amount + amountOfRooms};
                }
                return item;
            });
            alert("Item updated")
        }
        else {
            updatedCart = [...cart, { id: id, name: hotel.name, price: hotel.priceForNight, roomType: roomType, amount: amountOfRooms }];
            alert('Item added to cart');
        }
        dispatch(setCart(updatedCart));

        await postCart(updatedCart);
    }

    if (isLoading) {
        return (<><Navbar/><Loader/></>)
    }

    if (!hotel) {
        return (<><Navbar/><div>Hotel not found</div></>)
    }

    document.title = `BookAHotel - ${hotel.name}`;

    const roomTypeChange = (type) => {
        if (type === 'Single room') {
            setRoomType('Single room')
            setRoomTypePrice(1);
        }
        else {
            setRoomType('Double room');
            setRoomTypePrice(2);
        }
    }

    const amountOfRoomsChange = (amount) => {
        setAmountOfRooms(amount);
    }

    return (
    <>
    <Navbar/>
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
            <button onClick={addToCart} className='item-nav__button'>Add to cart</button>
        </nav>
      </div>
    </div>
    </>
  )
}

export default Item
