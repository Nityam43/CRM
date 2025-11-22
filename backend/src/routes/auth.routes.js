const express = require("express");
const userModel = require("../models/user.model");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await userModel.findOne({
    username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Username already exists",
    });
  }

  // Create new user if user does not exist
  const user = await userModel.create({ username, email, password });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

module.exports = router;
