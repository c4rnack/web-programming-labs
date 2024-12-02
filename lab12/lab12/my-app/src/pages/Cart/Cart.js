import React, {useEffect} from 'react';
import './Cart.css';
import CartListItem from '../../components/CartListItem/CartListItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeItem, setCart } from '../../Redux/CartSlice';
import Navbar from '../../components/Navbar/Navbar';
import { getCart, postCart } from '../../API/api';


function Cart() {
  document.title = 'BookAHotel - cart';

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  useEffect(() => {
    const fetchCart = async () => {
      const userCart = await getCart();
      dispatch(setCart(userCart.data.items));
    }

    fetchCart();
  }, [dispatch])

  useEffect(() => {
    const updateCart = async (cart) => {
      postCart(cart);
    }

    updateCart(cart);
  }, [cart]);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.amount * (item.roomType === 'Single room' ? 1 : 2);
  }, 0);

  const handleIncrement = async (id, roomType) => {
    dispatch(incrementQuantity({id: id, roomType: roomType}));
  }

  const handleDecrement = async (id, roomType) => {
    const item = cart.find(item => item.id === id && item.roomType === roomType);
    if (item.amount > 1) dispatch(decrementQuantity({id: id, roomType: roomType}));
    else dispatch(removeItem({id: id, roomType: roomType}));
  }

  return (
    <>
    <Navbar/>
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
        {cart.length !== 0 && (<NavLink className='cart-continue__button' to='/checkout'>Continue</NavLink>)}
      </div>
    </div>
    </>
  )
}

export default Cart
