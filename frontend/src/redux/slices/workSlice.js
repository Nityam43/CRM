import { createSlice } from '@reduxjs/toolkit';
import { fetchWorks, addWork, updateWork, deleteWork, fetchDeletedWorks, restoreWork, permanentDeleteWork } from '../thunks';

const initialState = {
  works: [],
  deletedWorks: [],
  status: 'idle',
  error: null,
};

const workSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Works
      .addCase(fetchWorks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.works = action.payload;
      })
      .addCase(fetchWorks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Work
      .addCase(addWork.fulfilled, (state, action) => {
        state.works.unshift(action.payload);
      })
      // Update Work
      .addCase(updateWork.fulfilled, (state, action) => {
        const index = state.works.findIndex((work) => work._id === action.payload._id);
        if (index !== -1) {
          state.works[index] = action.payload;
        }
      })
      // Delete Work (Soft)
      .addCase(deleteWork.fulfilled, (state, action) => {
        state.works = state.works.filter((work) => work._id !== action.payload);
      })
      // Fetch Deleted Works
      .addCase(fetchDeletedWorks.fulfilled, (state, action) => {
        state.deletedWorks = action.payload;
      })
      // Restore Work
      .addCase(restoreWork.fulfilled, (state, action) => {
        state.deletedWorks = state.deletedWorks.filter((work) => work._id !== action.payload.data._id);
        state.works.unshift(action.payload.data);
      })
      // Permanent Delete Work
      .addCase(permanentDeleteWork.fulfilled, (state, action) => {
        state.deletedWorks = state.deletedWorks.filter((work) => work._id !== action.payload);
      });
  },
});

export default workSlice.reducer;
