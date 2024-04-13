const jwt = require("jsonwebtoken");
const createError = require("../error.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports.verifyToken = function (req, res, next) {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return next(createError(401, "You are not authenticated"));

    jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
      if (err) {
        // Xử lý lỗi từ jwt.verify()
        if (err.name === 'TokenExpiredError') {
          return next(createError(401, "Token expired"));
        } else if (err.name === 'JsonWebTokenError') {
          return next(createError(401, "Token is invalid"));
        } else {
          return next(createError(500, "Error verifying token"));
        }
      }
      req.user = decode;
      return next();
    });
  } catch (err) {
    next(err);
  }
};
