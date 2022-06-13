import NavItem from "./NavItem";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

const Navigation = ({ onLogout }) => {
  const [user] = useContext(UserContext);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = (event) => {
    setNavbarOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setNavbarOpen(false);
  };
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
        <li class="logo" onClick={() => closeMenu()}>
          <Link to="/">
            <img src={logo} />
          </Link>
        </li>
        <li onClick={() => closeMenu()}>
          <NavItem link="myplans" />
        </li>
        <li onClick={() => closeMenu()}>
          <NavItem link="mybookmarkedplans" title="Bookmarked Plans" />
        </li>
        <li onClick={() => closeMenu()}>
          <NavItem link="plans" title="All Plans" />
        </li>
        <li onClick={() => closeMenu()}>
          <NavItem link="workouts" title="All Workouts" />
        </li>
        <li onClick={() => closeMenu()}>
          <NavItem link="newWorkout" title="Create Workout" />
        </li>
        <li onClick={() => closeMenu()}>
          <NavItem link="newPlan" title="create Plan" />
        </li>
        <li onClick={() => closeMenu()}>
          <NavItem link="logout" />
        </li>
        <li onClick={() => closeMenu()}>
          <NavItem link={"user/" + user.username} title={user.username} />
        </li>
      </>
    );
  }
  return (
    <nav className="navBar">
      <button onClick={handleToggle}>
        {navbarOpen ? (
          <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
        ) : (
          <FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
        )}
      </button>
      <ul className={`menuNav ${navbarOpen ? "showMenu" : ""}`}>{navSec}</ul>
    </nav>
  );
};

export default Navigation;
