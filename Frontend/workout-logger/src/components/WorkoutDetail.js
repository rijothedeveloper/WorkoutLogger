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

  let muscleElm;
  if (workout.musles) {
    muscleElm = workout.musles.map((m) => <div class="group">{m.name}</div>);
  }

  let equipElm;
  if (workout.equipments) {
    equipElm = workout.equipments.map((e) => <div class="group">{e.name}</div>);
  }

  return (
    <div class="detail-container">
      <div class="details">
        <h2>{workout.name}</h2>
        <img src={workout.image_url} alt={workout.name}></img>
        <h3>{(workout.name + " benefits").toUpperCase()} </h3>
        <h3>{workout.description}</h3>
      </div>
      <div class="muslegroup">
        <div class="musle-container">
          <h3>MUSCLE GROUPS</h3>
          {muscleElm}
        </div>
        <div class="musle-container">
          <h3>EQUIPMENT</h3>
          {equipElm}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;
