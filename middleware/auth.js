const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const { userUnauthorized } = require("../utils/messageServerResponse");

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  const { SECRET_KEY = "development-secret-key" } = process.env;

  if (!token) {
    return next(ApiError.unauthorized(userUnauthorized));
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(ApiError.unauthorized(userUnauthorized));
  }

  req.user = payload;

  return next();
};
