import Plans from "./Plans";
import SavedPlans from "./SavedPlans";
import Workouts from "./Workouts";
import UserContext from "../UserContext";
import { useContext } from "react";
import NavItem from "./NavItem";
import fitImg from "../images/fitnessbg.jpeg";

const Main = () => {
  const [user] = useContext(UserContext);
  function outPut() {
    if (user.loggedin) {
      return (
        <>
          <SavedPlans />
          <Plans />
          <Workouts />
        </>
      );
    } else {
      return (
        <div class="home">
          <div class="homec">
            <h1>Fitness To Look Cool</h1>
            <NavItem link="login" />
            <NavItem link="register" />
          </div>
          <div class="homec">
            <img src={fitImg} class="homec" />
          </div>
        </div>
      );
    }
  }
  return outPut();
};

export default Main;
