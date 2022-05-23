const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const expressError = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const payload = jwt.verify(token, jwt_secret);
    req.user = payload;
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(err);
    }
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    const error = new expressError(401, "unauthorized");
    return next(err);
  } else {
    return next();
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
};
