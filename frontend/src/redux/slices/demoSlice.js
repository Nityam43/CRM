import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDemos,
  addDemo,
  updateDemo,
  deleteDemo,
  moveEnquiryToDemo,
  cancelDemo,
  updateEnquiry,
  updateEnroll,
  fetchDeletedDemos,
  restoreDemo,
  permanentDeleteDemo,
  restoreCancelledDemo,
} from "../thunks";

const initialState = {
  demos: [],
  deletedDemos: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const demoSlice = createSlice({
  name: "demos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDemos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.demos = action.payload;
      })
      .addCase(fetchDemos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addDemo.fulfilled, (state, action) => {
        state.demos.push(action.payload);
      })
      .addCase(updateDemo.fulfilled, (state, action) => {
        const newDemos = state.demos.map((demo) =>
          demo._id === action.payload._id ? action.payload : demo
        );
        state.demos = newDemos;
      })
      .addCase(deleteDemo.fulfilled, (state, action) => {
        const index = state.demos.findIndex(
          (demo) => demo._id === action.payload
        );
        if (index !== -1) {
          state.demos.splice(index, 1);
        }
      })
      .addCase(moveEnquiryToDemo.fulfilled, (state, action) => {
        state.demos.push(action.payload.newDemo);
      })
      .addCase(cancelDemo.fulfilled, (state, action) => {
        const newDemos = state.demos.map((demo) =>
          demo._id === action.payload._id ? action.payload : demo
        );
        state.demos = newDemos;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        // When an enquiry is updated, update the corresponding demos
        const updatedEnquiry = action.payload;
        state.demos = state.demos.map((demo) => {
          // Match by enquiryId if available
          if (demo.enquiryId === updatedEnquiry._id) {
            return {
              ...demo,
              ...updatedEnquiry,
              course: updatedEnquiry.education,
            };
          }
          // Fallback: match by email
          if (demo.email === updatedEnquiry.email) {
            return {
              ...demo,
              ...updatedEnquiry,
              course: updatedEnquiry.education,
            };
          }
          return demo;
        });
      })
      .addCase(updateEnroll.fulfilled, (state, action) => {
        // When an enroll is updated, update the corresponding demo
        const updatedEnroll = action.payload;
        state.demos = state.demos.map((demo) => {
          // Match by demoId if available
          if (demo._id === updatedEnroll.demoId) {
            return { ...demo, ...updatedEnroll };
          }
          // Fallback: match by email + course
          if (
            demo.email === updatedEnroll.email &&
            demo.course === updatedEnroll.course
          ) {
            return { ...demo, ...updatedEnroll };
          }
          return demo;
        });
      })
      .addCase(fetchDeletedDemos.fulfilled, (state, action) => {
        state.deletedDemos = action.payload;
      })
      .addCase(restoreDemo.fulfilled, (state, action) => {
        state.deletedDemos = state.deletedDemos.filter(d => d._id !== action.payload.data._id);
        state.demos.push(action.payload.data);
      })
      .addCase(permanentDeleteDemo.fulfilled, (state, action) => {
        state.deletedDemos = state.deletedDemos.filter(d => d._id !== action.payload);
      })
      .addCase(restoreCancelledDemo.fulfilled, (state, action) => {
        const index = state.demos.findIndex(d => d._id === action.payload.data._id);
        if (index !== -1) {
          state.demos[index] = action.payload.data;
        } else {
          state.demos.push(action.payload.data);
        }
      });
  },
});

export default demoSlice.reducer;
