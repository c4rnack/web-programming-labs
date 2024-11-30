import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
  };
  
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      setCart(state, action) {
        state.items = action.payload;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      },
      incrementQuantity(state, action) {
        const { id, roomType } = action.payload;
        const item = state.items.find(i => i.id === id && i.roomType === roomType);
        if (item) {
          item.amount += 1;
          localStorage.setItem('cartItems', JSON.stringify(state.items));
        }
      },
      decrementQuantity(state, action) {
        const { id, roomType } = action.payload;
        const item = state.items.find(i => i.id === id && i.roomType === roomType);
        if (item && item.amount > 1) {
          item.amount -= 1;
          localStorage.setItem('cartItems', JSON.stringify(state.items));
        }
      },
      removeItem(state, action) {
        const { id, roomType } = action.payload;
        state.items = state.items.filter(item => !(item.id === id && item.roomType === roomType));
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
  });
  
export const { setCart, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;