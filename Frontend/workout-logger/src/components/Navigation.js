import NavItem from "./NavItem";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext } from "react";

const Navigation = ({ onLogout }) => {
  const [user] = useContext(UserContext);
  let navSec;
  if (!user.loggedin) {
    navSec = (
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
    navSec = (
      <>
        <li class="logo">
          <Link to="/">
            <img src={logo} />
          </Link>
        </li>
        <li>
          <NavItem link="myplans" />
        </li>
        <li>
          <NavItem link="mybookmarkedplans" title="Bookmarked Plans" />
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
        <li>
          <NavItem link="logout" />
        </li>
        <li>
          <NavItem link={"user/" + user.username} title={user.username} />
        </li>
      </>
    );
  }
  return (
    <nav>
      <ul>{navSec}</ul>
    </nav>
  );
};

export default Navigation;
