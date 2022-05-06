const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const expressError = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const token = req.body.token;
    const payload = jwt.verify(token, jwt_secret);
    req.user = payload;
    return next();
  } catch (err) {
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
