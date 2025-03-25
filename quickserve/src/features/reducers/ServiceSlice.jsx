import { createSlice } from "@reduxjs/toolkit";

const ServiceSlice = createSlice({
  name: "services",
  initialState: {
    service: [],
  },
  reducers: {
    Addservice: (state, action) => {
      state.service.push(action.payload);
    },

    Removeservice: (state, action) => {
      state.service = state.service.filter((service) => service.service_id !== action.payload);
    },

    updateservice: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.service.findIndex((service) => service.service_id === id);
      if (index !== -1) {
        state.service[index] = { ...state.service[index], ...updatedData };
      }
    },

    clearservice: (state) => {
      state.service = [];
    },

    setservice: (state, action) => {
      state.service = action.payload;
    },
  },
});

export const { Addservice, Removeservice, updateservice, clearservice, setservice } = ServiceSlice.actions;
export default ServiceSlice.reducer;
