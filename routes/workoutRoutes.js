const express = require("express");
const ExpressError = require("../expressError");
const workoutRouter = new express.Router();
const { ensureLoggedIn } = require("../middleware/auth");

const workoutClass = require("../model/workout");
const workout = new workoutClass();

workoutRouter.get("/", ensureLoggedIn, async (req, res) => {
  const results = await workout.getAllWorkouts(
    req.query.category,
    req.query.muscles,
    req.query.name
  );
  return res.json(results);
});

workoutRouter.post("/plan", ensureLoggedIn, async (req, res, next) => {
  const data = {
    name: req.body.name,
    notes: req.body.notes,
    username: req.user.username,
    sun: req.body.sun,
    mon: req.body.mon,
    tue: req.body.tue,
    wed: req.body.wed,
    thu: req.body.thu,
    fri: req.body.fri,
    sat: req.body.sat,
    workouts: req.body.workouts,
  };
  try {
    const result = await workout.addPlan(data);
    if (result) {
      return res.json({ result: "success" });
    }
  } catch (err) {
    const error = new ExpressError(
      400,
      "error in entering data to database " + err
    );
    return next(error);
  }
});

module.exports = workoutRouter;
