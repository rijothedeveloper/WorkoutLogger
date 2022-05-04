const express = require("express");
const res = require("express/lib/response");
const workoutRouter = new express.Router();

const workoutClass = require("../model/workout");
const workout = new workoutClass();

workoutRouter.get("/", async (req, res) => {
  const results = await workout.getAllWorkouts(
    req.query.category,
    req.query.muscles
  );
  return res.json(results);
});

module.exports = workoutRouter;
