import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import enquiryReducer from './slices/enquirySlice';
import demoReducer from './slices/demoSlice';
import enrollReducer from './slices/enrollSlice';
import feesReducer from './slices/feesSlice';
import workReducer from './slices/workSlice';
import expenseReducer from './slices/expenseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    enquiries: enquiryReducer,
    demos: demoReducer,
    enrolls: enrollReducer,
    fees: feesReducer,
    works: workReducer,
    expenses: expenseReducer,
  },
});
