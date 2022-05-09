const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_secret, JWT_OPTIONS, BCRYPT_WORK_FACTOR } = require("../config");

async function registerUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  const result = await db.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username`,
    [username, hashedPassword]
  );
  return result.rows[0];
}

async function loginUser(username, password) {
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  const user = result.rows[0];
  if (user) {
    if ((await bcrypt.compare(password, user.password)) === true) {
      // const payload = { username: user.username };
      // const token = jwt.sign(payload, jwt_secret, JWT_OPTIONS);
      return user;
    } else {
      throw new ExpressError("Invalid user/password", 400);
    }
  } else {
    throw new ExpressError("Invalid user/password", 400);
  }
}

exports.registerUser = registerUser;
exports.loginUser = loginUser;
