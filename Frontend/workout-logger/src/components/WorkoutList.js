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
      <div className="card-column">{workoutElments}</div>
    </div>
  );
};

export default WorkoutList;
