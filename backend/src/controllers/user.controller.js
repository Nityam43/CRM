const userModel = require("../models/user.model");

async function getUserController(req, res) {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
}

module.exports = {
  getUserController,
};
