import { createSlice } from "@reduxjs/toolkit";

// Load cart from local storage for guest users
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

// Save cart to local storage
const saveCartToLocalStorage = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((i) => i.service_id === action.payload.service_id);

      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already in cart
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.service_id !== action.payload);
      saveCartToLocalStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      console.log(id,quantity)
      const item = state.items.find((i) => i.service_id === id);

      if (item) {
        item.quantity = quantity;
        saveCartToLocalStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },

    setCart: (state, action) => {
      state.items = action.payload;
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
