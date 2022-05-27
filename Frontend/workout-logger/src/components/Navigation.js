import NavItem from "./NavItem";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Navigation = ({ loggedin, onLogout, username }) => {
  let logginSec;
  if (!loggedin) {
    logginSec = (
      <>
        <li>
          <NavItem link="login" />
        </li>
        <li>
          <NavItem link="register" />
        </li>
      </>
    );
  } else {
    logginSec = (
      <>
        <li>
          <NavItem link="logout" />
        </li>
        <li>
          <NavItem link={"user/" + username} title={username} />
        </li>
      </>
    );
  }
  return (
    <nav>
      <ul>
        <li class="logo">
          <Link to="/">
            <img src={logo} />
          </Link>
        </li>
        <li>
          <NavItem link="myplans" />
        </li>
        <li>
          <NavItem link="plans" title="All Plans" />
        </li>
        <li>
          <NavItem link="workouts" title="All Workouts" />
        </li>
        <li>
          <NavItem link="newWorkout" title="Create Workout" />
        </li>
        <li>
          <NavItem link="newPlan" title="create Plan" />
        </li>
        {logginSec}
      </ul>
    </nav>
  );
};

export default Navigation;
