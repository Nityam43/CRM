import { createSlice } from "@reduxjs/toolkit";
import { fetchFees, addFee, deleteFee } from "../thunks";

const initialState = {
  fees: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const feesSlice = createSlice({
  name: "fees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fees = action.payload;
      })
      .addCase(fetchFees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addFee.fulfilled, (state, action) => {
        const updatedEnrollment = action.payload;
        // Logic to update fees based on the updated enrollment
      })
      .addCase(deleteFee.fulfilled, (state, action) => {
        const updatedEnrollment = action.payload;
        // Logic to update fees based on the updated enrollment
      });
  },
});

export default feesSlice.reducer;
