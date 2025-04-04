const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const sessionId = req.headers["session-id"];

  if (!sessionId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findOne({ session_id: sessionId });
    if (!user) {
      return res.status(401).json({ message: "Invalid session" });
    }

    req.user = user; // Store user in request
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authMiddleware;
