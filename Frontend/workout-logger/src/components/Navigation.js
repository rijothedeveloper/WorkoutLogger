import { Logout } from "./Logout";
import NavItem from "./NavItem";

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
      {" "}
      <ul>{logginSec} </ul>
    </nav>
  );
};

export default Navigation;
