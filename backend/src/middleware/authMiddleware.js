const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Akses ditolak! Token tidak ada.",
    });
  }

  // ✅ FIX: Use process.env.JWT_SECRET (same as authController)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token tidak valid atau kadaluarsa.",
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
