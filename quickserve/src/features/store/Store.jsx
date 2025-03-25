import React from 'react'
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/Slice';
import cartSlice from '../reducers/cartslice'
import ServiceSlice from '../reducers/ServiceSlice'

const store = configureStore({
    reducer: {
      auth: authReducer,
      cart:cartSlice,
      services:ServiceSlice,
    },
  });
  
  export default store;

