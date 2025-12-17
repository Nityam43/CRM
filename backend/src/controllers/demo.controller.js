const Demo = require("../models/demo.model.js");
const Enquiry = require("../models/enquiry.model.js");
const Enroll = require("../models/enroll.model.js");

// Create a new demo
const createDemo = async (req, res) => {
  console.log("Attempting to create demo with data:", req.body);
  try {
    const demoData = { ...req.body };
    if (demoData.reminderDate) {
      demoData.reminder = demoData.reminderDate;
      delete demoData.reminderDate;
    }
    const demo = new Demo(demoData);
    await demo.save();

    // Find the corresponding enquiry and update its status
    if (req.body.enquiryId) {
      await Enquiry.findByIdAndUpdate(req.body.enquiryId, {
        status: "Moved to Demo",
      });
    }

    res.status(201).json({
      message: "Demo created successfully",
      data: demo,
    });
  } catch (error) {
    console.error("Error creating demo:", error);
    res.status(400).json({
      message: "Error creating demo",
      error: error.message,
    });
  }
};

// Get all demos
const getDemos = async (req, res) => {
  try {
    const demos = await Demo.find();
    res.status(200).json(demos);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching demos",
      error: error.message,
    });
  }
};

// Get a single demo by ID
const getDemoById = async (req, res) => {
  try {
    const { id } = req.params;
    const demo = await Demo.findById(id);
    if (!demo) {
      return res.status(404).json({ message: "Demo not found" });
    }
    res.status(200).json(demo);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching demo",
      error: error.message,
    });
  }
};

// Update a demo by ID
const updateDemo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDemo = await Demo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDemo) {
      return res.status(404).json({ message: "Demo not found" });
    }

    // Sync updated demo data to related Enquiry and Enroll documents
    try {
      // Fields that should be synced across all related documents
      const syncFields = {
        studentName: updatedDemo.studentName,
        firstMobile: updatedDemo.firstMobile,
        secondMobile: updatedDemo.secondMobile,
        email: updatedDemo.email,
        course: updatedDemo.course,
        reference: updatedDemo.reference,
        counsellor: updatedDemo.counsellor,
      };

      // Update the corresponding enquiry if enquiryId exists
      if (updatedDemo.enquiryId) {
        await Enquiry.findByIdAndUpdate(updatedDemo.enquiryId, {
          ...syncFields,
          education: updatedDemo.course, // course in demo maps to education in enquiry
        });
      }

      // Update all enrolls with the same demoId
      await Enroll.updateMany({ demoId: id }, syncFields);

      // Update enrolls with matching email and course
      if (updatedDemo.email) {
        await Enroll.updateMany(
          { email: updatedDemo.email, course: updatedDemo.course },
          syncFields
        );
      }
    } catch (err) {
      console.error("Error syncing demo data to related documents:", err);
      // Don't fail the response if sync fails, just log it
    }

    // Find the corresponding enquiry and update its status
    if (updatedDemo.email && req.body.status) {
      await Enquiry.findOneAndUpdate(
        { email: updatedDemo.email },
        { status: req.body.status },
        { new: true }
      );
    }

    res.status(200).json(updatedDemo);
  } catch (error) {
    res.status(500).json({
      message: "Error updating demo",
      error: error.message,
    });
  }
};

// Delete a demo by ID
const deleteDemo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDemo = await Demo.findByIdAndDelete(id);
    if (!deletedDemo) {
      return res.status(404).json({ message: "Demo not found" });
    }
    res.status(200).json({ message: "Demo deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting demo",
      error: error.message,
    });
  }
};

// Cancel a demo by ID
const cancelDemo = async (req, res) => {
  try {
    const { id } = req.params;
    const canceledDemo = await Demo.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );
    if (!canceledDemo) {
      return res.status(404).json({ message: "Demo not found" });
    }

    // Find the corresponding enquiry and update its status
    if (canceledDemo.email) {
      await Enquiry.findOneAndUpdate(
        { email: canceledDemo.email },
        { status: "Cancelled" },
        { new: true }
      );

      // Also delete from enroll list if it exists
      await Enroll.findOneAndDelete({
        email: canceledDemo.email,
        course: canceledDemo.course,
      });
    }

    res.status(200).json(canceledDemo);
  } catch (error) {
    res.status(500).json({
      message: "Error canceling demo",
      error: error.message,
    });
  }
};

module.exports = {
  createDemo,
  getDemos,
  getDemoById,
  updateDemo,
  deleteDemo,
  cancelDemo,
};
