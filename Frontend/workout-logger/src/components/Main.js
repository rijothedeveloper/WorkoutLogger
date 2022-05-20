import Plans from "./Plans";
import SavedPlans from "./SavedPlans";
import Workouts from "./Workouts";

const Main = ({ plans, loggedIn }) => {
  return (
    <>
      <SavedPlans plans={plans} loggedIn={loggedIn} />
      <Plans />
      <Workouts />
    </>
  );
};

export default Main;
