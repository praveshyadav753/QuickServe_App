import React from 'react'
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/Slice';
import cartSlice from '../reducers/cartslice'

const store = configureStore({
    reducer: {
      auth: authReducer,
      cart:cartSlice,
    },
  });
  
  export default store;

