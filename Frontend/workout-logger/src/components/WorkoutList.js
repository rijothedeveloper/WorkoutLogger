import Workout from "./Workout";

const WorkoutList = ({ workouts, addable, handleChange }) => {
  const workoutElments = workouts.map((e) => (
    <Workout
      workout={e}
      key={e.id}
      addable={addable}
      handleChange={handleChange}
    />
  ));

  return (
    <div>
      <h2>Workouts sec</h2>
      <div className="card-raw">{workoutElments}</div>
    </div>
  );
};

export default WorkoutList;
