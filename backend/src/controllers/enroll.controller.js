const Enroll = require("../models/enroll.model.js");
const Demo = require("../models/demo.model.js");
const Enquiry = require("../models/enquiry.model.js");

// --- Get all enrollments ---
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enroll.find();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching enrollments",
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
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching enrollment",
      error: error.message,
    });
  }
};

const getEnrollmentByEnrollNo = async (req, res) => {
  try {
    const { enrollNo } = req.params;
    const enrollment = await Enroll.findOne({ enrollNo: enrollNo }).populate('demoId').populate('enquiryId');
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching enrollment",
      error: error.message,
    });
  }
};

// --- Create a new enrollment ---
const createEnrollment = async (req, res) => {
  try {
    const { studentName, course, demoId, enquiryId } = req.body;

    // --- Prevent Duplicate Enrollments ---
    let existingEnrollment;

    // Priority 1: Check by demoId or enquiryId for direct links
    if (demoId) {
      existingEnrollment = await Enroll.findOne({ demoId });
    } else if (enquiryId) {
      existingEnrollment = await Enroll.findOne({ enquiryId });
    }

    // Priority 2: Fallback to check by student name and course
    if (!existingEnrollment) {
      existingEnrollment = await Enroll.findOne({ studentName, course });
    }

    if (existingEnrollment) {
      return res.status(409).json({
        message: "This student is already enrolled in this course.",
        existingEnrollment,
      });
    }

    // 1. Generate a unique enrollment number
    const lastEnroll = await Enroll.findOne().sort({ enrollNo: -1 });
    let newEnrollNo = "0001";
    if (lastEnroll && lastEnroll.enrollNo) {
      const lastNo = parseInt(lastEnroll.enrollNo, 10);
      newEnrollNo = (lastNo + 1).toString().padStart(4, "0");
    }

    // 2. Create and save the new enrollment
    const newEnrollment = new Enroll({
      ...req.body,
      enrollNo: newEnrollNo,
      totalFees: req.body.courseFees,
      paidFees: 0,
      pendingFees: req.body.courseFees,
    });
    const savedEnrollment = await newEnrollment.save();

    // 3. Update the status of the corresponding Demo or Enquiry
    if (demoId) {
      await Demo.findByIdAndUpdate(demoId, { status: "Enrolled" });
    }
    if (enquiryId) {
      await Enquiry.findByIdAndUpdate(enquiryId, { status: "Enrolled" });
    }

    res.status(201).json({
      message: "Enrollment created successfully",
      data: savedEnrollment,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating enrollment",
      error: error.message,
    });
  }
};

// --- Update an enrollment by ID ---
const updateEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEnrollment = await Enroll.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEnrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Sync updated enroll data to related Demo and Enquiry documents
    try {
      // Fields that should be synced across all related documents
      const syncFields = {
        studentName: updatedEnrollment.studentName,
        firstMobile: updatedEnrollment.firstMobile,
        secondMobile: updatedEnrollment.secondMobile,
        email: updatedEnrollment.email,
        course: updatedEnrollment.course,
        reference: updatedEnrollment.reference,
        counsellor: updatedEnrollment.counsellor,
      };

      // Update the corresponding demo if demoId exists
      if (updatedEnrollment.demoId) {
        await Demo.findByIdAndUpdate(updatedEnrollment.demoId, syncFields);
      }

      // Update the corresponding enquiry if enquiryId exists
      if (updatedEnrollment.enquiryId) {
        await Enquiry.findByIdAndUpdate(updatedEnrollment.enquiryId, {
          ...syncFields,
          education: updatedEnrollment.course, // course in enroll maps to education in enquiry
        });
      } else if (updatedEnrollment.email) {
        // Fallback: update enquiry by email if enquiryId doesn't exist
        await Enquiry.findOneAndUpdate(
          { email: updatedEnrollment.email },
          {
            ...syncFields,
            education: updatedEnrollment.course,
          }
        );
      }

      // Also update demos by email + course match as a fallback
      if (updatedEnrollment.email) {
        await Demo.updateMany(
          { email: updatedEnrollment.email, course: updatedEnrollment.course },
          syncFields
        );
      }
    } catch (err) {
      console.error("Error syncing enroll data to related documents:", err);
      // Don't fail the response if sync fails, just log it
    }

    res.status(200).json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({
      message: "Error updating enrollment",
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
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting enrollment",
      error: error.message,
    });
  }
};

const cancelEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body; // Reason for cancellation

    const updatedEnrollment = await Enroll.findByIdAndUpdate(
      id,
      { status: "Cancelled", reason: reason || "Not specified" },
      { new: true }
    );

    if (!updatedEnrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({
      message: "Error cancelling enrollment",
      error: error.message,
    });
  }
};

const restoreEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEnrollment = await Enroll.findByIdAndUpdate(
      id,
      { status: "Enrolled", reason: "" },
      { new: true }
    );

    if (!updatedEnrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({
      message: "Error restoring enrollment",
      error: error.message,
    });
  }
};

const addFeePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = req.body;

        const enrollment = await Enroll.findById(id);
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        enrollment.payments.push(payment);
        enrollment.paidFees += payment.amount;
        enrollment.pendingFees -= payment.amount;

        const updatedEnrollment = await enrollment.save();
        res.status(200).json(updatedEnrollment);
    } catch (error) {
        res.status(500).json({
            message: "Error adding fee payment",
            error: error.message,
        });
    }
};

module.exports = {
  getEnrollments,
  getEnrollmentById,
  getEnrollmentByEnrollNo,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  cancelEnrollment,
  restoreEnrollment,
  addFeePayment,
};
