const express = require("express");
const userRouter = new express.Router();
const user = require("../model/user");
const ExpressError = require("../expressError");

userRouter.post("/register", async (req, res, next) => {
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

userRouter.get("/login", async (req, res, next) => {
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
