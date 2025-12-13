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
        // This is tricky because addFee returns the updated enrollment, not the flattened fee object.
        // For now, we'll rely on a re-fetch. A better implementation would be to construct the fee object here.
      })
      .addCase(deleteFee.fulfilled, (state, action) => {
        const { paymentId } = action.meta.arg;
        state.fees = state.fees.filter((fee) => fee._id !== paymentId);
      });
  },
});

export default feesSlice.reducer;
