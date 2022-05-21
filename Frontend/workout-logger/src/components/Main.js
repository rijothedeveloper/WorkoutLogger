import Plans from "./Plans";
import SavedPlans from "./SavedPlans";
import Workouts from "./Workouts";

const Main = ({ username, token }) => {
  return (
    <>
      <SavedPlans token={token} username={username} />
      <Plans token={token} />
      <Workouts token={token} />
    </>
  );
};

export default Main;
