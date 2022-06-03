const express = require("express");
const userRouter = new express.Router();
const users = require("../model/user");
const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");
const loginRegisterSchems = require("../schemas/loginRegister.json");
const createToken = require("../helpers/tokens");
const { ensureLoggedIn, ensureSameUser } = require("../middleware/auth");

userRouter.post("/register", async (req, res, next) => {
  const validity = jsonschema.validate(req.body, loginRegisterSchems);
  if (!validity.valid) {
    const listOfErrors = validity.errors.map((error) => error.stack);
    const expressError = new ExpressError(400, listOfErrors);
    return next(expressError);
  }
  try {
    const { firstName, lastName, username, password, height, weight } =
      req.body;
    const result = await users.registerUser(
      firstName,
      lastName,
      username,
      password,
      height,
      weight
    );
    return res.status(201).json(result);
  } catch (error) {
    const customError = new ExpressError(406, "error in creating new user  ");
    return next(customError);
  }
});

userRouter.post("/login", async (req, res, next) => {
  const validity = jsonschema.validate(req.body, loginRegisterSchems);
  if (!validity.valid) {
    const listOfErrors = validity.errors.map((error) => error.stack);
    const expressError = new ExpressError(400, listOfErrors);
    return next(expressError);
  }
  try {
    const { username, password } = req.body;
    const user = await users.loginUser(username, password);
    if (user) {
      const token = createToken(user);
      return res.json({
        firstName: user.firstname,
        lastName: user.lastname,
        username: user.username,
        height: user.height,
        weight: user.weight,
        token,
      });
    }
  } catch (err) {
    const customError = new ExpressError(406, err.errorMessage);
    return next(customError);
  }
});

userRouter.get(
  "/:username",
  ensureLoggedIn,
  ensureSameUser,
  async (req, res, next) => {
    try {
      const user = await users.getUserInfo(req.user.username);
      return res.json({
        firstName: user.firstname,
        lastName: user.lastname,
        username: user.username,
        height: user.height,
        weight: user.weight,
      });
    } catch (err) {
      const customError = new ExpressError(400, "error in user " + err);
      return next(customError);
    }
  }
);

userRouter.post(
  "/:username",
  ensureLoggedIn,
  ensureSameUser,
  async (req, res, next) => {
    const validity = jsonschema.validate(req.body, loginRegisterSchems);
    if (!validity.valid) {
      const listOfErrors = validity.errors.map((error) => error.stack);
      const expressError = new ExpressError(400, listOfErrors);
      return next(expressError);
    }
    try {
      const { firstName, lastName, username, password, height, weight } =
        req.body;
      const result = await users.saveUserInfo(
        firstName,
        lastName,
        username,
        password,
        height,
        weight
      );
      if (result) {
        return res.status(201).json(result);
      }
      return res.status(400).json(result);
    } catch (error) {
      const customError = new ExpressError(
        400,
        "error in updating user  " + error
      );
      return next(customError);
    }
  }
);

module.exports = userRouter;
