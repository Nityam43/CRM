import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEnquiries,
  addEnquiry,
  updateEnquiry,
  deleteEnquiry,
  moveEnquiryToDemo,
  cancelEnquiry,
  updateDemo,
  updateEnroll,
  fetchDeletedEnquiries,
  restoreEnquiry,
  permanentDeleteEnquiry,
  restoreCancelledEnquiry,
} from "../thunks";

const initialState = {
  enquiries: [],
  deletedEnquiries: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enquiries = action.payload;
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEnquiry.fulfilled, (state, action) => {
        state.enquiries.push(action.payload);
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        const newEnquiries = state.enquiries.map((enquiry) =>
          enquiry._id === action.payload._id ? action.payload : enquiry
        );
        state.enquiries = newEnquiries;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        const index = state.enquiries.findIndex(
          (enquiry) => enquiry._id === action.payload
        );
        if (index !== -1) {
          state.enquiries.splice(index, 1);
        }
      })
      .addCase(moveEnquiryToDemo.fulfilled, (state, action) => {
        const newEnquiries = state.enquiries.map((enquiry) =>
          enquiry._id === action.payload.originalEnquiryId
            ? { ...enquiry, status: "Moved to Demo" }
            : enquiry
        );
        state.enquiries = newEnquiries;
      })
      .addCase(cancelEnquiry.fulfilled, (state, action) => {
        const newEnquiries = state.enquiries.map((enquiry) =>
          enquiry._id === action.payload._id ? action.payload : enquiry
        );
        state.enquiries = newEnquiries;
      })
      .addCase(updateDemo.fulfilled, (state, action) => {
        // When a demo is updated, update the corresponding enquiry
        const updatedDemo = action.payload;
        state.enquiries = state.enquiries.map((enquiry) =>
          enquiry._id === updatedDemo.enquiryId
            ? { ...enquiry, ...updatedDemo }
            : enquiry
        );
      })
      .addCase(updateEnroll.fulfilled, (state, action) => {
        // When an enroll is updated, update the corresponding enquiry
        const updatedEnroll = action.payload;
        state.enquiries = state.enquiries.map((enquiry) => {
          // Match by enquiryId if available
          if (
            updatedEnroll.enquiryId &&
            enquiry._id === updatedEnroll.enquiryId
          ) {
            return {
              ...enquiry,
              ...updatedEnroll,
              education: updatedEnroll.course,
            };
          }
          // Fallback: match by email if enquiryId is not available
          if (updatedEnroll.email && enquiry.email === updatedEnroll.email) {
            return {
              ...enquiry,
              ...updatedEnroll,
              education: updatedEnroll.course,
            };
          }
          return enquiry;
        });
      })
      .addCase(fetchDeletedEnquiries.fulfilled, (state, action) => {
        state.deletedEnquiries = action.payload;
      })
      .addCase(restoreEnquiry.fulfilled, (state, action) => {
        // Remove from deleted list
        state.deletedEnquiries = state.deletedEnquiries.filter(e => e._id !== action.payload.data._id);
        // Add to main list
        state.enquiries.push(action.payload.data);
      })
      .addCase(permanentDeleteEnquiry.fulfilled, (state, action) => {
        state.deletedEnquiries = state.deletedEnquiries.filter(e => e._id !== action.payload);
      })
      .addCase(restoreCancelledEnquiry.fulfilled, (state, action) => {
        // Find if the enquiry exists in the list (it might still be there but with 'Cancelled' status)
        const index = state.enquiries.findIndex(e => e._id === action.payload.data._id);
        if (index !== -1) {
          state.enquiries[index] = action.payload.data;
        } else {
          // If not in the list (e.g. filtered out), add it
          state.enquiries.push(action.payload.data);
        }
      });
  },
});

export default enquirySlice.reducer;
