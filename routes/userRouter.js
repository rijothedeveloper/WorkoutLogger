const express = require("express");
const userRouter = new express.Router();
const users = require("../model/user");
const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");
const loginRegisterSchems = require("../schemas/loginRegister.json");
const createToken = require("../helpers/tokens");

userRouter.post("/register", async (req, res, next) => {
  const validity = jsonschema.validate(req.body, loginRegisterSchems);
  if (!validity.valid) {
    const listOfErrors = validity.errors.map((error) => error.stack);
    const expressError = new ExpressError(400, listOfErrors);
    return next(expressError);
  }
  try {
    const { username, password } = req.body;
    const result = await users.registerUser(username, password);
    return res.status(201).json(result);
  } catch (error) {
    const customError = new ExpressError(
      400,
      "error in username and password  " + error
    );
    return next(customError);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await users.loginUser(username, password);
    if (user) {
      const token = createToken(user);
      return res.json({ token });
    }
  } catch (err) {
    const customError = new ExpressError(
      400,
      "error in username and password field required " + err
    );
    return next(customError);
  }
});

module.exports = userRouter;
