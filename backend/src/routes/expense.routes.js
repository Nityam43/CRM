const express = require('express');
const {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/expense.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
