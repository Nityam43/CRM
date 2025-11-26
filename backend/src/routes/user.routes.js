const express = require("express");
const {
  getUserController,
  logoutController,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route - get user info
router.get("/me", authMiddleware, getUserController);

// Logout route
router.post("/logout", authMiddleware, logoutController);

module.exports = router;
