import Plans from "./Plans";
import SavedPlans from "./SavedPlans";
import Workouts from "./Workouts";

const Main = ({ token }) => {
  return (
    <>
      <SavedPlans />
      <Plans token={token} />
      <Workouts />
    </>
  );
};

export default Main;
