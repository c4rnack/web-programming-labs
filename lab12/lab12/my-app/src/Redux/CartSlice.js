import {createSlice} from '@reduxjs/toolkit';
import { getCart } from '../API/api';

let initialState;

if (!!localStorage.getItem('user')){
  const response = await getCart();
  initialState = {items: response.data.items}
}
else {
  initialState = {items: []}
}

  
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      setCart(state, action) {
        state.items = action.payload;
      },
      incrementQuantity(state, action) {
        const { id, roomType } = action.payload;
        const item = state.items.find(i => i.id === id && i.roomType === roomType);
        if (item) {
          item.amount += 1;
        }
      },
      decrementQuantity(state, action) {
        const { id, roomType } = action.payload;
        const item = state.items.find(i => i.id === id && i.roomType === roomType);
        if (item && item.amount > 1) {
          item.amount -= 1;
        }
      },
      removeItem(state, action) {
        const { id, roomType } = action.payload;
        state.items = state.items.filter(item => !(item.id === id && item.roomType === roomType));
      }
    },
  });
  
export const { setCart, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;