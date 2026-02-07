const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    paymentType: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    gstNo: {
        type: String,
    },
    reminderDate: {
        type: Date,
    },
    bankName: {
        type: String,
    },
    chequeNo: {
        type: String,
    },
    chequeDate: {
        type: Date,
    },
});

const enrollSchema = new mongoose.Schema({
    // Fields from Enquiry/Demo
    studentName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // While emails should be unique per person, a person could enroll in multiple courses.
        // So, uniqueness constraint might be on a combination of email and course, but for now we'll keep it simple.
    },
    firstMobile: {
        type: String,
    },
    secondMobile: {
        type: String,
    },
    course: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
    },
    counsellor: {
        type: String,
    },
    // New fields for Enrollment
    enrollNo: {
        type: String,
        required: true,
        unique: true,
    },
    enrollDate: {
        type: Date,
        default: Date.now,
    },
    courseFees: {
        type: Number,
        required: true,
    },
    totalFees: {
        type: Number,
    },
    paidFees: {
        type: Number,
        default: 0
    },
    pendingFees: {
        type: Number,
    },
    teacherName: {
        type: String,
        required: true,
    },
    time: { // Lab/Class time
        type: String,
    },
    placementStatus: {
        type: String,
        enum: ['Placement', 'Not-required', 'Pending'],
        default: 'Pending',
    },
    status: {
        type: String,
        default: 'Enrolled',
    },
    reason: {
        type: String, // To store reason for cancellation or other status changes
    },
    payments: [paymentSchema],
    // We can also link back to the original demo or enquiry if needed
    demoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Demo'
    },
    enquiryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enquiry'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Enroll = mongoose.model('Enroll', enrollSchema);

module.exports = Enroll;
