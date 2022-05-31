import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkout } from "../networking/Networking";
import UserContext from "../UserContext";

const WorkoutDetail = () => {
  const [user] = useContext(UserContext);
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState({});
  useEffect(() => {
    const getWorkout = async () => {
      if (user.token) {
        const w = await fetchWorkout(user.token, workoutId);
        setWorkout(w);
      } else {
        // setWorkout([]);
      }
    };
    getWorkout();
  }, [user.token, workoutId]);
  return (
    <div>
      <h2>Workout details</h2>
      <h3>Name: {workout.name}</h3>
      <h3>Description: {workout.description}</h3>
      <img src={workout.image_url}></img>
    </div>
  );
};

export default WorkoutDetail;
