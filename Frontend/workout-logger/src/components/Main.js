import Plans from "./Plans";
import SavedPlans from "./SavedPlans";
import Workouts from "./Workouts";

const Main = ({ token }) => {
  return (
    <>
      <SavedPlans />
      <Plans token={token} />
      <Workouts token={token} />
    </>
  );
};

export default Main;
