import { createSlice } from '@reduxjs/toolkit';
const storedToken = localStorage.getItem("token");

// Initial state for authentication
const initialState = {
  user: null, // store user data after login
  isAuthenticated: !!storedToken, // check if user is authenticated
  loading: false, // track loading state during auth requests
  error: null, // store error messages if any
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action for login success
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    // Action for login failure
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    // Action to log out
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.clear();
    },
    // Action for loading state
    setLoading: (state) => {
      state.loading = true;
    },
  },
});



  
  
const initialservices=[];

const Services = createSlice({
  name: 'service',
  reducers: {
    
    initialservices,
    addservice: (state,action)=>{
       
    },
    removeService: (state,action)=>{
      
    },
    updateService: (state,action)=>{
  },
}
});

// Export actions
export const { loginSuccess, loginFailure, logout, setLoading } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
