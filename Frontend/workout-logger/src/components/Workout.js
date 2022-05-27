import workoutImage from "../images/workout.jpeg";

const Workout = ({ workout, addable, handleChange }) => {
  const handleWorkoutChange = (event) => {
    handleChange(event.target.value, event.target.checked);
  };
  if (!addable) {
    return (
      <div className="card">
        <a href={"/workout/" + workout.id}>
          <figure>
            <img src={workoutImage} height="200px" />
            <figcaption>
              <h2>{workout.name}</h2>
            </figcaption>
          </figure>
        </a>
      </div>
    );
  } else {
    return (
      <div className="card cursor">
        <figure>
          <img src={workoutImage} height="200px" />
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
