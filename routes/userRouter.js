const express = require("express");
const userRouter = new express.Router();
const user = require("../model/user");
const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");
const loginRegisterSchems = require("../schemas/loginRegister.json");

userRouter.post("/register", async (req, res, next) => {
  const validity = jsonschema.validate(req.body, loginRegisterSchems);
  if (!validity.valid) {
    const listOfErrors = validity.errors.map((error) => error.stack);
    const expressError = new ExpressError(400, listOfErrors);
    return next(expressError);
  }
  try {
    const { username, password } = req.body;
    const result = await user.registerUser(username, password);
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
    const result = await user.loginUser(username, password);
    return res.json(result);
  } catch (err) {
    const customError = new ExpressError(
      400,
      "error in username and password  " + err
    );
    return next(customError);
  }
});

module.exports = userRouter;
