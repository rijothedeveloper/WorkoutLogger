import { Link } from "react-router-dom";
import workoutImage from "../images/workout.jpeg";

const Workout = ({ workout, addable, handleChange }) => {
  const handleWorkoutChange = (event) => {
    handleChange(event.target.value, event.target.checked);
  };
  if (!addable) {
    return (
      <div className="workout-raw">
        <div className="info">
          <h2>{workout.name}</h2>
          <h3>Equipment:</h3>
          <h3>Primary Muscles:</h3>
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
        </div>
        <figure>
          {workout.image_url ? (
            <img src={workout.image_url} height="200px" />
          ) : (
            <img src={workoutImage} height="200px" />
          )}
          <figcaption>
            <h2>{workout.name}</h2>
          </figcaption>
        </figure>
        <div class="checkbox">
          <input
            type="checkbox"
            value={workout.id}
            onChange={handleWorkoutChange}
          />
        </div>
      </div>
    );
  }
};

export default Workout;
