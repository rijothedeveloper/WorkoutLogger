import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkout } from "../networking/Networking";

const WorkoutDetail = ({ token }) => {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState({});
  useEffect(() => {
    const getWorkout = async () => {
      if (token) {
        const w = await fetchWorkout(token, workoutId);
        setWorkout(w);
      } else {
        setWorkout([]);
      }
    };
    getWorkout();
  }, [token]);
  return <div>{workout.name}</div>;
};

export default WorkoutDetail;
