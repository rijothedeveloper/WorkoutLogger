const express = require("express");
const workoutRouter = new express.Router();

const workoutClass = require("../model/workout");
const workout = new workoutClass();

workoutRouter.get("/", async (req, res) => {
  const results = await workout.getAllWorkouts(
    req.query.category,
    req.query.muscles,
    req.query.name
  );
  return res.json(results);
});

module.exports = workoutRouter;
