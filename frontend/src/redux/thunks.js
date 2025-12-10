import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// Enquiry Thunks
export const fetchEnquiries = createAsyncThunk('enquiries/fetchEnquiries', async () => {
  const response = await api.get('/enquiry');
  return response.data;
});

export const addEnquiry = createAsyncThunk('enquiries/addEnquiry', async (enquiryData) => {
  const response = await api.post('/enquiry/add', enquiryData);
  return response.data;
});

export const updateEnquiry = createAsyncThunk('enquiries/updateEnquiry', async ({ id, enquiryData }) => {
  const response = await api.put(`/enquiry/${id}`, enquiryData);
  return response.data;
});

export const deleteEnquiry = createAsyncThunk('enquiries/deleteEnquiry', async (id) => {
  await api.delete(`/enquiry/${id}`);
  return id;
});

export const cancelEnquiry = createAsyncThunk('enquiries/cancelEnquiry', async (id) => {
  const response = await api.put(`/enquiry/cancel/${id}`);
  return response.data;
});

export const moveEnquiryToDemo = createAsyncThunk('enquiries/moveEnquiryToDemo', async (enquiry) => {
  const response = await api.post('/demo', {
    ...enquiry,
    course: enquiry.education,
    status: 'Demo',
    enquiryId: enquiry._id,
  });
  return { newDemo: response.data.data, originalEnquiryId: enquiry._id };
});

// Demo Thunks
export const fetchDemos = createAsyncThunk('demos/fetchDemos', async () => {
    const response = await api.get('/demo');
    return response.data;
});

export const addDemo = createAsyncThunk('demos/addDemo', async (demoData) => {
    const response = await api.post('/demo', demoData);
    return response.data;
});

export const updateDemo = createAsyncThunk('demos/updateDemo', async ({ id, demoData }) => {
    const response = await api.put(`/demo/${id}`, demoData);
    return response.data;
});

export const deleteDemo = createAsyncThunk('demos/deleteDemo', async (id) => {
    await api.delete(`/demo/${id}`);
    return id;
});

export const cancelDemo = createAsyncThunk('demos/cancelDemo', async (id) => {
    const response = await api.patch(`/demo/cancel/${id}`);
    return response.data;
});

// Enroll Thunks
export const fetchEnrolls = createAsyncThunk('enrolls/fetchEnrolls', async () => {
    const response = await api.get('/enroll');
    return response.data;
});

export const addEnroll = createAsyncThunk('enrolls/addEnroll', async (enrollData) => {
    const response = await api.post('/enroll', enrollData);
    return response.data;
});

export const updateEnroll = createAsyncThunk('enrolls/updateEnroll', async ({ id, enrollData }) => {
    const response = await api.put(`/enroll/${id}`, enrollData);
    return response.data;
});

export const deleteEnroll = createAsyncThunk('enrolls/deleteEnroll', async (id) => {
    await api.delete(`/enroll/${id}`);
    return id;
});

export const cancelEnroll = createAsyncThunk('enrolls/cancelEnroll', async (id) => {
    const response = await api.patch(`/enroll/cancel/${id}`);
    return response.data;
});
