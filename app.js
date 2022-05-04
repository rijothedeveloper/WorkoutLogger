const express = require("express");
const expressError = require("./expressError");
const workoutRouts = require("./routes/workoutRoutes");

const app = express();

app.use("/workouts", workoutRouts);

app.get("/workouts", (req, res, next) => {
  try {
    return res.send("workouts come here");
  } catch (err) {
    return next(err);
  }
});

app.use(function (req, res, next) {
  const notFoundError = new expressError(404, "not found");
  return next(notFoundError);
});

app.use(function (err, req, res, next) {
  const status = err.status;
  const message = err.message;
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
