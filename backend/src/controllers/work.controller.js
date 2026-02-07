const Work = require('../models/work.model.js');

// Create a new work
const createWork = async (req, res) => {
    try {
        const { workName, personName, reminderDate, details } = req.body;
        
        if (!workName || !personName || !reminderDate) {
            return res.status(400).json({ message: "Work name, person name and reminder date are required" });
        }

        const newWork = new Work({
            workName,
            personName,
            reminderDate,
            details
        });

        const savedWork = await newWork.save();
        res.status(201).json(savedWork);
    } catch (error) {
        res.status(500).json({ message: "Error creating work", error: error.message });
    }
};

// Get all works (excluding deleted)
const getWorks = async (req, res) => {
    try {
        const works = await Work.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });
        res.status(200).json(works);
    } catch (error) {
        res.status(500).json({ message: "Error fetching works", error: error.message });
    }
};

// Get work by ID
const getWorkById = async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);
        if (!work) {
            return res.status(404).json({ message: "Work not found" });
        }
        res.status(200).json(work);
    } catch (error) {
        res.status(500).json({ message: "Error fetching work", error: error.message });
    }
};

// Update work
const updateWork = async (req, res) => {
    try {
        const updatedWork = await Work.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedWork) {
            return res.status(404).json({ message: "Work not found" });
        }
        res.status(200).json(updatedWork);
    } catch (error) {
        res.status(500).json({ message: "Error updating work", error: error.message });
    }
};

// Soft delete work
const deleteWork = async (req, res) => {
    try {
        const work = await Work.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!work) {
            return res.status(404).json({ message: "Work not found" });
        }
        res.status(200).json({ message: "Work moved to trash", data: work });
    } catch (error) {
        res.status(500).json({ message: "Error deleting work", error: error.message });
    }
};

// Get deleted works
const getDeletedWorks = async (req, res) => {
    try {
        const works = await Work.find({ isDeleted: true }).sort({ updatedAt: -1 });
        res.status(200).json(works);
    } catch (error) {
        res.status(500).json({ message: "Error fetching deleted works", error: error.message });
    }
};

// Restore work
const restoreWork = async (req, res) => {
    try {
        const work = await Work.findByIdAndUpdate(
            req.params.id,
            { isDeleted: false },
            { new: true }
        );
        if (!work) {
            return res.status(404).json({ message: "Work not found" });
        }
        res.status(200).json({ message: "Work restored", data: work });
    } catch (error) {
        res.status(500).json({ message: "Error restoring work", error: error.message });
    }
};

// Permanent delete work
const permanentDeleteWork = async (req, res) => {
    try {
        const work = await Work.findByIdAndDelete(req.params.id);
        if (!work) {
            return res.status(404).json({ message: "Work not found" });
        }
        res.status(200).json({ message: "Work permanently deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error permanently deleting work", error: error.message });
    }
};


module.exports = {
    createWork,
    getWorks,
    getWorkById,
    updateWork,
    deleteWork,
    getDeletedWorks,
    restoreWork,
    permanentDeleteWork
};
