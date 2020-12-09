const config = require("config");
const jwt = require("jsonwebtoken");
let userRol;
const authorizationMiddleware = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  if (!jwtToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(jwtToken.split(" ")[1], config.jwtSecretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token Expired" });
    }
    res.decoded = decoded;
    userRol = decoded.rol;
    next();
  });
};
const isAdmin = (req, res, next) => {
  if (userRol === 1) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  authorizationMiddleware,
  isAdmin,
};
