import Workout from "./Workout";

const WorkoutList = ({ workouts }) => {
  const workoutElments = workouts.map((e) => <Workout workout={e} />);

  return (
    <div>
      <h2>Workouts sec</h2>
      <div className="card-raw">{workoutElments}</div>
    </div>
  );
};

export default WorkoutList;
