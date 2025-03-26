import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 

// ✅ Fetch services from API when Redux initializes
export const fetchServices = createAsyncThunk("services/fetch", async () => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  const response = await axios.get("http://127.0.0.1:8000/service/services/?role=business", {
    headers: {
      Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
    },
  });

  return response.data.services; // Assuming response.data is an array of services
});


const serviceSlice = createSlice({
  name: "services",
  initialState: {
    service: [],
    loading: false,
    error: null,
  },
  reducers: {
    addService: (state, action) => {
      state.service.push(action.payload);
    },
    removeService: (state, action) => {
      state.service = state.service.filter((s) => s.service_id !== action.payload);
    },
    updateService: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.service.findIndex((s) => s.service_id === id);
      if (index !== -1) {
        state.service[index] = { ...state.service[index], ...updatedData };
      }
    },
    clearService: (state) => {
      state.service = [];
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { addService, removeService, updateService, clearService, setService } = serviceSlice.actions;
export default serviceSlice.reducer;
