import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEnrolls,
  addEnroll,
  updateEnroll,
  deleteEnroll,
  cancelEnroll,
  updateDemo,
  updateEnquiry,
} from "../thunks";

const initialState = {
  enrolls: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const enrollSlice = createSlice({
  name: "enrolls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolls.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEnrolls.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrolls = action.payload;
      })
      .addCase(fetchEnrolls.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEnroll.fulfilled, (state, action) => {
        state.enrolls.push(action.payload);
      })
      .addCase(updateEnroll.fulfilled, (state, action) => {
        const newEnrolls = state.enrolls.map((enroll) =>
          enroll._id === action.payload._id ? action.payload : enroll
        );
        state.enrolls = newEnrolls;
      })
      .addCase(deleteEnroll.fulfilled, (state, action) => {
        const index = state.enrolls.findIndex(
          (enroll) => enroll._id === action.payload
        );
        if (index !== -1) {
          state.enrolls.splice(index, 1);
        }
      })
      .addCase(cancelEnroll.fulfilled, (state, action) => {
        const newEnrolls = state.enrolls.map((enroll) =>
          enroll._id === action.payload._id ? action.payload : enroll
        );
        state.enrolls = newEnrolls;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        // When an enquiry is updated, update the corresponding enrolls
        const updatedEnquiry = action.payload;
        state.enrolls = state.enrolls.map((enroll) => {
          // Match by enquiryId if available
          if (enroll.enquiryId === updatedEnquiry._id) {
            return { ...enroll, ...updatedEnquiry };
          }
          // Fallback: match by email
          if (enroll.email === updatedEnquiry.email) {
            return { ...enroll, ...updatedEnquiry };
          }
          return enroll;
        });
      })
      .addCase(updateDemo.fulfilled, (state, action) => {
        // When a demo is updated, update the corresponding enrolls
        const updatedDemo = action.payload;
        state.enrolls = state.enrolls.map((enroll) => {
          // Match by demoId if available
          if (enroll.demoId === updatedDemo._id) {
            return { ...enroll, ...updatedDemo };
          }
          // Fallback: match by email + course
          if (
            enroll.email === updatedDemo.email &&
            enroll.course === updatedDemo.course
          ) {
            return { ...enroll, ...updatedDemo };
          }
          return enroll;
        });
      });
  },
});

export default enrollSlice.reducer;
