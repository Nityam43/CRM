const express = require('express');
const router = express.Router();
const workController = require('../controllers/work.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');

// Route to get all works and create a new work
router.route('/')
    .get(authMiddleware, workController.getWorks)
    .post(authMiddleware, workController.createWork);

// Route to get, update, and delete a specific work by ID
router.route('/:id')
    .get(authMiddleware, workController.getWorkById)
    .put(authMiddleware, workController.updateWork)
    .delete(authMiddleware, workController.deleteWork);

// Route to get deleted works
router.get('/deleted/all', workController.getDeletedWorks);

// Route to restore work or permanently delete
router.put('/restore/:id', authMiddleware, workController.restoreWork);
router.delete('/force/:id', authMiddleware, workController.permanentDeleteWork);

module.exports = router;
