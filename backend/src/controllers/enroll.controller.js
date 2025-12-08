const Enroll = require('../models/enroll.model.js');
const Demo = require('../models/demo.model.js');
const Enquiry = require('../models/enquiry.model.js');

// --- Get all enrollments ---
const getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enroll.find();
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching enrollments',
            error: error.message,
        });
    }
};

// --- Get a single enrollment by ID ---
const getEnrollmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const enrollment = await Enroll.findById(id);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching enrollment',
            error: error.message,
        });
    }
};


// --- Create a new enrollment ---
const createEnrollment = async (req, res) => {
    try {
        const { email, course, studentName, ...otherData } = req.body;

        // 1. Generate a unique enrollment number
        const lastEnroll = await Enroll.findOne().sort({ enrollNo: -1 });
        let newEnrollNo = '0001';
        if (lastEnroll && lastEnroll.enrollNo) {
            const lastNo = parseInt(lastEnroll.enrollNo, 10);
            newEnrollNo = (lastNo + 1).toString().padStart(4, '0');
        }

        // 2. Create and save the new enrollment
        const newEnrollment = new Enroll({
            ...req.body,
            enrollNo: newEnrollNo
        });
        const savedEnrollment = await newEnrollment.save();

        // 3. Update the status of the corresponding Demo and Enquiry
        if (email) {
            // Update Demo status to 'Enrolled'
            await Demo.findOneAndUpdate(
                { email: email, course: course },
                { status: 'Enrolled' },
                { new: true }
            );
            // Update Enquiry status to 'Enrolled'
            await Enquiry.findOneAndUpdate(
                { email: email },
                { status: 'Enrolled' },
                { new: true }
            );
        }

        res.status(201).json({
            message: 'Enrollment created successfully',
            data: savedEnrollment,
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error creating enrollment',
            error: error.message,
        });
    }
};


// --- Update an enrollment by ID ---
const updateEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEnrollment = await Enroll.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEnrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.status(200).json(updatedEnrollment);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating enrollment',
            error: error.message,
        });
    }
};

// --- Delete an enrollment by ID ---
const deleteEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEnrollment = await Enroll.findByIdAndDelete(id);
        if (!deletedEnrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting enrollment',
            error: error.message,
        });
    }
};


module.exports = {
    getEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
};