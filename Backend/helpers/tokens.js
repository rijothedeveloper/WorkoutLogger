const jwt = require("jsonwebtoken");
const { jwt_secret, JWT_OPTIONS } = require("../config");

function createToken(user) {
  const payload = { username: user.username };
  return jwt.sign(payload, jwt_secret, JWT_OPTIONS);
}

module.exports = createToken;
