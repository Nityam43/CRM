const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demo.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');

// Route to get all demos and create a new demo
router.route('/')
    .get(demoController.getDemos)
    .post(authMiddleware, demoController.createDemo);

// Route to get, update, and delete a specific demo by ID
router.route('/:id')
    .get(demoController.getDemoById)
    .put(authMiddleware, demoController.updateDemo)
    .delete(authMiddleware, demoController.deleteDemo);

router.get('/deleted/all', demoController.getDeletedDemos);
router.put('/restore/:id', authMiddleware, demoController.restoreDemo);
router.delete('/force/:id', authMiddleware, demoController.permanentDeleteDemo);

// Route to cancel a specific demo by ID
router.route('/cancel/:id')
    .patch(authMiddleware, demoController.cancelDemo);

router.patch('/restore-cancelled/:id', authMiddleware, demoController.restoreCancelledDemo);

module.exports = router;