const jwt_secret = "its a secret";
const JWT_OPTIONS = { expiresIn: 60 * 60 };
const BCRYPT_WORK_FACTOR = 12;

module.exports = {
  jwt_secret,
  JWT_OPTIONS,
  BCRYPT_WORK_FACTOR,
};
