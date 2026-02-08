import { createSlice } from '@reduxjs/toolkit';
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from '../thunks';

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenses: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Expenses
            .addCase(fetchExpenses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.expenses = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add Expense
            .addCase(addExpense.fulfilled, (state, action) => {
                state.expenses.unshift(action.payload);
            })
            // Update Expense
            .addCase(updateExpense.fulfilled, (state, action) => {
                const index = state.expenses.findIndex((e) => e._id === action.payload._id);
                if (index !== -1) {
                    state.expenses[index] = action.payload;
                }
            })
            // Delete Expense
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.expenses = state.expenses.filter((e) => e._id !== action.meta.arg);
            });
    },
});

export default expenseSlice.reducer;
