import React, { useEffect, useState } from "react";
import Workout from "./Workout";
import { fetchWorkouts } from "../networking/Networking";
import WorkoutList from "./WorkoutList";

const Workouts = ({ token }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getWorkots = async () => {
      if (token) {
        const workouts = await fetchWorkouts(token);
        if (workouts) setWorkouts(workouts);
      }
    };
    getWorkots();
  }, [token]);

  return <WorkoutList workouts={workouts} />;
};

export default Workouts;
