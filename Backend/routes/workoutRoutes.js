const express = require("express");
const ExpressError = require("../expressError");
const workoutRouter = new express.Router();
const { ensureLoggedIn } = require("../middleware/auth");

const workoutClass = require("../model/workout");
const workout = new workoutClass();

const jsonSchema = require("jsonschema");
const planSchema = require("../schemas/planschema.json");
const workoutSchema = require("../schemas/addWorkout.json");

workoutRouter.get("/", ensureLoggedIn, async (req, res) => {
  const results = await workout.getAllWorkouts(
    req.query.category,
    req.query.muscles,
    req.query.name
  );
  return res.json(results);
});

workoutRouter.post("/plan", ensureLoggedIn, async (req, res, next) => {
  const inputValidity = jsonSchema.validate(req.body, planSchema);
  if (!inputValidity.valid) {
    const listOfErrors = inputValidity.errors.map((error) => error.stack);
    const expressError = new ExpressError(406, listOfErrors);
    return next(expressError);
  }
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

workoutRouter.get("/plan/", ensureLoggedIn, async (req, res, next) => {
  try {
    const plans = await workout.getPlans(req.query.name, req.query.username);
    return res.json(plans);
  } catch (err) {
    const error = new ExpressError(406, "error in getting plans " + err);
    return next(error);
  }
});

workoutRouter.get("/plan/:planId", ensureLoggedIn, async (req, res, next) => {
  try {
    const workouts = await workout.getPlanWorkouts(req.params.planId);
    return res.json(workouts);
  } catch (err) {
    const error = new ExpressError(
      406,
      "error in getting plans workouts " + err
    );
    return next(error);
  }
});

workoutRouter.get("/muscles", ensureLoggedIn, async (req, res, next) => {
  try {
    const muscles = await workout.getMuscles();
    return res.json(muscles);
  } catch (err) {
    const error = new ExpressError(400, "problem retriving muscles " + err);
    return next(error);
  }
});

workoutRouter.get(
  "/workoutCategories",
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      const categories = await workout.getWorkoutCategory();
      return res.json(categories);
    } catch (err) {
      const error = new ExpressError(400, "problem retriving muscles " + err);
      return next(error);
    }
  }
);

workoutRouter.post("/addWorkout", ensureLoggedIn, async (req, res, next) => {
  const w = req.body;
  const inputValidity = jsonSchema.validate(req.body, workoutSchema);
  if (!inputValidity.valid) {
    const listOfErrors = inputValidity.errors.map((error) => error.stack);
    const expressError = new ExpressError(406, listOfErrors);
    return next(expressError);
  }
  try {
    const workoutId = await workout.addWorkout(w);
    return res.json(workoutId);
  } catch (err) {
    const error = new ExpressError(
      400,
      "error in entering workout to database " + err
    );
    return next(error);
  }
});

module.exports = workoutRouter;
