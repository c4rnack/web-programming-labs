import React, { useEffect } from 'react';
import './Cart.css';
import CartListItem from '../../components/CartListItem/CartListItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeItem } from '../../Redux/CartSlice';

function Cart() {
  document.title = 'BookAHotel - cart';

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.amount * (item.roomType === 'Single room' ? 1 : 2);
  }, 0);

  const handleIncrement = (id, roomType) => {
    dispatch(incrementQuantity({id: id, roomType: roomType}));
  }

  const handleDecrement = (id, roomType) => {
    const item = cart.find(item => item.id === id && item.roomType === roomType);
    if (item.amount > 1) dispatch(decrementQuantity({id: id, roomType: roomType}));
    else dispatch(removeItem({id: id, roomType: roomType}));
  }

  return (
    <div className='cart'>
      <h1 className='cart-header'>Shopping cart</h1>
      {cart.length === 0 ? (<p className='cart-empty__text'>You have not added anything to your cart yet</p>) : 
      (<>
      <ul className='cart-list'>
        {cart.map(hotel => (<CartListItem hotel={hotel} 
        key={`${hotel.id}-${hotel.roomType}`} 
        onPlus={handleIncrement} onMinus={handleDecrement}/>))}
      </ul>
      <h2 className='cart-total__price'>Total price: {totalPrice} $</h2>
      </>)}
      <div className='cart-links'>
        <NavLink className='cart-back__button' to='/catalog'>Back to catalog</NavLink>
        {cart.length !== 0 && (<NavLink className='cart-continue__button' to='/'>Continue</NavLink>)}
      </div>
    </div>
  )
}

export default Cart
