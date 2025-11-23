const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  const { username, email, password } = req.body;

  // Check if user already exists.
  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Username already exists",
    });
  }

  // Hashing the password before storing it.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user if user does not exist.
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

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
}

async function loginController(req, res) {
  // It checks for both username and email(identifier).
  const { identifier, password } = req.body;

  // Find user by username or email.
  const user = await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Check password.
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // Set token to cookie
  res.cookie("token", token);

  res.status(200).json({
    message: "Login Successful",
    user,
    token,
  });
}

module.exports = {
  registerController,
  loginController,
};
