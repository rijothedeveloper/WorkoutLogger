import workoutImage from "../images/workout.jpeg";

const Workout = ({ workout }) => {
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
};

export default Workout;
