// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async API call
// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   const response = await axios.get("/api/users");
//   return response.data;
// });

// const userSlice = createSlice({
//   name: "users",
//   initialState: { data: [], loading: false, error: null },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default userSlice.reducer;
