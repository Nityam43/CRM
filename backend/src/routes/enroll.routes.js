const express = require('express');
const {
    getEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    cancelEnrollment,
} = require('../controllers/enroll.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

// Route to get all enrollments
router.get('/', getEnrollments);

// Route to get a single enrollment by ID
router.get('/:id', getEnrollmentById);

// Route to create a new enrollment
router.post('/', createEnrollment);

// Route to update an enrollment by ID
router.put('/:id', updateEnrollment);

// Route to delete an enrollment by ID
router.delete('/:id', deleteEnrollment);

// Route to cancel an enrollment by ID
router.patch('/cancel/:id', cancelEnrollment);

module.exports = router;
