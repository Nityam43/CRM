const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    birthDate: {
        type: Date,
    },
    firstMobile: {
        type: String,
    },
    secondMobile: {
        type: String,
    },
    leadDate: {
        type: Date,
    },
    visitingDate: {
        type: Date,
    },
    age: {
        type: Number,
    },
    education: {
        type: String,
    },
    currentWorking: {
        type: String,
    },
    relationStatus: {
        type: String,
        enum: ['Married', 'UnMarried'],
    },
    reference: {
        type: String,
    },
    area: {
        type: String,
    },
    hobbies: {
        type: String,
    },
    interest: {
        type: String,
    },
    reminderDate: {
        type: Date,
    },
    enquiryRating: {
        type: String,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    },
    counsellor: {
        type: String, // For now, will revisit if it needs to be a ref
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        default: 'Enquiry',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
