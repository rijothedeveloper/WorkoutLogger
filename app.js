const express = require("express");
const expressError = require("./expressError");
const workoutRouts = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/workouts", workoutRouts);
app.use("/user", userRoutes);

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
