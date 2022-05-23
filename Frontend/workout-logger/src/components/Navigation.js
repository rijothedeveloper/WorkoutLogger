import { Logout } from "./Logout";
import NavItem from "./NavItem";

const Navigation = ({ loggedin, onLogout, username }) => {
  let logginSec;
  if (!loggedin) {
    logginSec = (
      <>
        <NavItem link="login" />
        <NavItem link="register" />
      </>
    );
  } else {
    logginSec = (
      <>
        {/* <Logout onLogout={onLogout} /> */}
        <NavItem link="logout" />
        <NavItem link={username} />
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
