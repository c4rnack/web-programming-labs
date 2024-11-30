import React from 'react';
import hotelImage from '../../assets/hotel_card_image.jpg';
import './CartListItem.css';

function CartListItem({hotel, onPlus, onMinus}) {
  const {id, name, price, roomType, amount} = hotel;
  return (
    <li className='cart-item'>
        <img className='cart-item__image' src={hotelImage} alt='hotel'/>
        <div className='cart-item__text'>
            <h3>{name}</h3>
            <p>{roomType}</p>
        </div>
        <div className='cart-item__counter'>
            <button onClick={() => onPlus(id, roomType)}>+</button>
            <p>{amount}</p>
            <button onClick={() => onMinus(id, roomType)}>-</button>
        </div>
        <p className='cart-item__price'>{price * amount * (roomType === 'Single room' ? 1 : 2)} $</p>
    </li>
  )
}

export default CartListItem
