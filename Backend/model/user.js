const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_secret, JWT_OPTIONS, BCRYPT_WORK_FACTOR } = require("../config");

async function registerUser(
  firstName,
  lastName,
  username,
  password,
  height = 0,
  weight = 0
) {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  const result = await db.query(
    `INSERT INTO users (firstname, lastname, username, password, height, weight) VALUES ($1, $2, $3, $4, $5, $6) RETURNING username`,
    [firstName, lastName, username, hashedPassword, height, weight]
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

async function getUserInfo(username) {
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  const user = result.rows[0];
  if (user) {
    return user;
  } else {
    throw new ExpressError("Invalid user/password", 400);
  }
}

async function saveUserInfo(
  firstName,
  lastName,
  username,
  password,
  height = 0,
  weight = 0
) {
  const query = `UPDATE users SET firstname='${firstName}', lastname='${lastName}', height=${height}, weight=${weight} WHERE username = '${username}' RETURNING username`;

  let result = await db.query(query);

  if (result.rows.length > 0 && password) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    result = await db.query(
      `UPDATE users SET password='${hashedPassword}' WHERE username = '${username}' RETURNING username`
    );
  }

  if (result.rows.length > 0) {
    return true;
  }
  return false;
}

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUserInfo = getUserInfo;
exports.saveUserInfo = saveUserInfo;
