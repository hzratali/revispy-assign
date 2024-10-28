const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
