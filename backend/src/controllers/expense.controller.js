const Expense = require('../models/expense.model.js');

// Get all expenses
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching expenses", error: error.message });
    }
};

// Create a new expense
const createExpense = async (req, res) => {
    try {
        const { name, category, amount, paymentMethod, date, note } = req.body;
        
        if (!name || !category || !amount) {
            return res.status(400).json({ message: "Name, category, and amount are required" });
        }

        const newExpense = new Expense({
            name,
            category,
            amount,
            paymentMethod,
            date: date || Date.now(),
            note,
            createdBy: req.userId // Assuming authMiddleware adds userId to req
        });

        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({ message: "Error creating expense", error: error.message });
    }
};

// Update an expense
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: "Error updating expense", error: error.message });
    }
};

// Delete an expense
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting expense", error: error.message });
    }
};

module.exports = {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
};
