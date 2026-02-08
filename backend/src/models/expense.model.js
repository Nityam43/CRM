const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Online', 'Cheque', 'Other'],
        default: 'Cash'
    },
    date: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
