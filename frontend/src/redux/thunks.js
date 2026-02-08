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
    reminder: enquiry.reminderDate, // Add this line
  });
  return { newDemo: response.data.data, originalEnquiryId: enquiry._id };
});

export const fetchDeletedEnquiries = createAsyncThunk('enquiries/fetchDeletedEnquiries', async () => {
    const response = await api.get('/enquiry/deleted/all');
    return response.data;
});

export const restoreEnquiry = createAsyncThunk('enquiries/restoreEnquiry', async (id) => {
    const response = await api.put(`/enquiry/restore/${id}`);
    return response.data;
});

export const permanentDeleteEnquiry = createAsyncThunk('enquiries/permanentDeleteEnquiry', async (id) => {
    await api.delete(`/enquiry/force/${id}`);
    return id;
});

export const restoreCancelledEnquiry = createAsyncThunk('enquiries/restoreCancelledEnquiry', async (id) => {
    const response = await api.patch(`/enquiry/restore-cancelled/${id}`);
    return response.data;
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

export const fetchDeletedDemos = createAsyncThunk('demos/fetchDeletedDemos', async () => {
    const response = await api.get('/demo/deleted/all');
    return response.data;
});

export const restoreDemo = createAsyncThunk('demos/restoreDemo', async (id) => {
    const response = await api.put(`/demo/restore/${id}`);
    return response.data;
});

export const permanentDeleteDemo = createAsyncThunk('demos/permanentDeleteDemo', async (id) => {
    await api.delete(`/demo/force/${id}`);
    return id;
});

export const restoreCancelledDemo = createAsyncThunk('demos/restoreCancelledDemo', async (id) => {
    const response = await api.patch(`/demo/restore-cancelled/${id}`);
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

export const cancelEnroll = createAsyncThunk('enrolls/cancelEnroll', async ({ id, reason }) => {
    const response = await api.patch(`/enroll/cancel/${id}`, { reason });
    return response.data;
});

export const restoreEnroll = createAsyncThunk('enrolls/restoreEnroll', async (id) => {
    const response = await api.patch(`/enroll/restore/${id}`);
    return response.data;
});

export const fetchDeletedEnrolls = createAsyncThunk('enrolls/fetchDeletedEnrolls', async () => {
    const response = await api.get('/enroll/deleted/all');
    return response.data;
});

export const restoreDeletedEnroll = createAsyncThunk('enrolls/restoreDeletedEnroll', async (id) => {
    const response = await api.put(`/enroll/restore/deleted/${id}`);
    return response.data;
});

export const permanentDeleteEnroll = createAsyncThunk('enrolls/permanentDeleteEnroll', async (id) => {
    await api.delete(`/enroll/force/${id}`);
    return id;
});

// Fees Thunks
export const fetchFees = createAsyncThunk('fees/fetchFees', async () => {
    const response = await api.get('/enroll');
    const enrollments = response.data;
    const fees = enrollments.reduce((acc, enrollment) => {
        const studentInfo = {
            enrollmentId: enrollment._id, // Add enrollmentId
            enrollNo: enrollment.enrollNo,
            studentName: enrollment.studentName,
            contact: enrollment.firstMobile,
            course: enrollment.course,
            totalFees: enrollment.totalFees,
            paidFees: enrollment.paidFees,
            pendingFees: enrollment.pendingFees,
        };
        enrollment.payments.forEach(payment => {
            acc.push({
                ...studentInfo,
                ...payment,
            });
        });
        return acc;
    }, []);
    return fees;
});

export const addFee = createAsyncThunk('fees/addFee', async ({ id, paymentData }) => {
    const response = await api.post(`/enroll/fees/${id}`, paymentData);
    return response.data; // Return the full updated enrollment
});

export const deleteFee = createAsyncThunk('fees/deleteFee', async ({ id, paymentId }) => {
    const response = await api.delete(`/enroll/fees/${id}/${paymentId}`);
    return response.data; // Return the full updated enrollment
});

// Work Thunks
export const fetchWorks = createAsyncThunk('works/fetchWorks', async () => {
    const response = await api.get('/work');
    return response.data;
});

export const addWork = createAsyncThunk('works/addWork', async (workData) => {
    const response = await api.post('/work', workData);
    return response.data;
});

export const updateWork = createAsyncThunk('works/updateWork', async ({ id, workData }) => {
    const response = await api.put(`/work/${id}`, workData);
    return response.data;
});

export const deleteWork = createAsyncThunk('works/deleteWork', async (id) => {
    await api.delete(`/work/${id}`); // Soft delete
    return id;
});

export const fetchDeletedWorks = createAsyncThunk('works/fetchDeletedWorks', async () => {
    const response = await api.get('/work/deleted/all');
    return response.data;
});

export const restoreWork = createAsyncThunk('works/restoreWork', async (id) => {
    const response = await api.put(`/work/restore/${id}`);
    return response.data;
});

export const permanentDeleteWork = createAsyncThunk('works/permanentDeleteWork', async (id) => {
    await api.delete(`/work/force/${id}`);
    return id;
});

// Expense Thunks
export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
    const response = await api.get('/expense');
    return response.data;
});

export const addExpense = createAsyncThunk('expenses/addExpense', async (expenseData) => {
    const response = await api.post('/expense', expenseData);
    return response.data;
});

export const updateExpense = createAsyncThunk('expenses/updateExpense', async ({ id, expenseData }) => {
    const response = await api.put(`/expense/${id}`, expenseData);
    return response.data;
});

export const deleteExpense = createAsyncThunk('expenses/deleteExpense', async (id) => {
    await api.delete(`/expense/${id}`);
    return id;
});
