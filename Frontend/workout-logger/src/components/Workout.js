import { Link } from "react-router-dom";
import workoutImage from "../images/workout.jpeg";
import plusIcon from "../images/plus64.png";
import minusIcon from "../images/minus64.png";

const Workout = ({ workout, addable, handleChange }) => {
  const handleWorkoutChange = (event) => {
    handleChange(event.target.value, event.target.checked);
  };
  let muscleElm;
  if (workout.musles) {
    muscleElm = workout.musles.map((m) => m.name);
  }

  let equipElm;
  if (workout.equipments) {
    equipElm = workout.equipments.map((e) => e.name);
  }

  if (!addable) {
    return (
      <div className="workout-raw">
        <div className="info">
          <h2>{workout.name}</h2>
          <h3>Equipment: {equipElm} </h3>
          <h3>Primary Muscles: {muscleElm} </h3>
        </div>

        {workout.image_url ? (
          <img src={workout.image_url} />
        ) : (
          <img src={workoutImage} />
        )}
        <Link to={"/workouts/" + workout.id}>
          <button class="cursor">VIEW DETAILS</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="workout-raw">
        <div className="info">
          <h2>{workout.name}</h2>
          <h3>Equipment: {equipElm} </h3>
          <h3>Primary Muscles: {muscleElm} </h3>
        </div>

        {workout.image_url ? (
          <img src={workout.image_url} />
        ) : (
          <img src={workoutImage} />
        )}
        <label class="mainCheck">
          <input
            id="customCheck"
            type="checkbox"
            value={workout.id}
            onChange={handleWorkoutChange}
          />
          <span class="w3docs"></span>
        </label>
      </div>
    );
  }
};

export default Workout;
