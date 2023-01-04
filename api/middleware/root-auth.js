const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.tagname === "root" && decoded.email === "root@root.com") {
      next();
    } else {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
