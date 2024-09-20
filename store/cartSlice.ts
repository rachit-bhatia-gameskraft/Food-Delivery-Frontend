// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<CartItem>) {
//       const item = action.payload;
//       const existingItem = state.items.find((i) => i.id === item.id);
//       if (existingItem) {
//         existingItem.quantity += item.quantity;
//       } else {
//         state.items.push(item);
//       }
//     },
//     updateCartItem(state, action: PayloadAction<{ id: string; quantity: number }>) {
//       const { id, quantity } = action.payload;
//       const item = state.items.find((i) => i.id === id);
//       if (item) {
//         item.quantity = quantity;
//         if (quantity <= 0) {
//           state.items = state.items.filter((i) => i.id !== id);
//         }
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, updateCartItem, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
