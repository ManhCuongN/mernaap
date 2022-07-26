const { log } = require("console");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ status: "false", message: "unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log(process.env.ACCESS_TOKEN);
    req.userId = decoded.userId;
    console.log(req.userId);
    next();
  } catch (e) {
    console.log(e);
    return res
      .status(403)
      .json({ status: "false", message: "Invalid access token" });
  }
};

module.exports = verifyToken;
