const Enquiry = require('../models/enquiry.model.js');

const createEnquiry = async (req, res) => {
    try {
        const enquiry = new Enquiry(req.body);
        await enquiry.save();
        res.status(201).json({
            message: 'Enquiry created successfully',
            data: enquiry,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating enquiry',
            error: error.message,
        });
    }
};

const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find();
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching enquiries',
            error: error.message,
        });
    }
};

const getEnquiryById = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }
        res.status(200).json(enquiry);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching enquiry',
            error: error.message,
        });
    }
};

const updateEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEnquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }
        res.status(200).json(updatedEnquiry);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating enquiry',
            error: error.message,
        });
    }
};

module.exports = {
    createEnquiry,
    getEnquiries,
    getEnquiryById,
    updateEnquiry,
};
