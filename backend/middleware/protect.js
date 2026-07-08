const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. No Token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
    console.log("DECODED TOKEN:", decoded); // 🔥 debug line

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = protect;