const express = require("express");
const { getUserController } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route - get user info
router.get("/me", authMiddleware, getUserController);

module.exports = router;
