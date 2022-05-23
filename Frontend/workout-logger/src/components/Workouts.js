import React, { useEffect, useState } from "react";
import { fetchWorkouts } from "../networking/Networking";
import WorkoutList from "./WorkoutList";
import { useNavigate } from "react-router-dom";

const Workouts = ({ token }) => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getWorkots = async () => {
      if (token) {
        const workouts = await fetchWorkouts(token);
        if (workouts) setWorkouts(workouts);
      }
    };
    getWorkots();
  }, [token]);

  if (workouts.error) {
    navigate("/login");
  }

  return <WorkoutList workouts={workouts} />;
};

export default Workouts;
