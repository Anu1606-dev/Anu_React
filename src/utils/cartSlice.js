import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    // Action == addItem
    // mutating the store here
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    // Action == removeItem
    removeItem: (state) => {
      state.items.pop();
    },
    // Actiom == clearCart
    clearCart: (state) => {
      state.items.length = 0;
    }
  },
}); 

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;