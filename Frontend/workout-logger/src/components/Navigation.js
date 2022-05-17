import { Logout } from "./Logout";
import NavItem from "./NavItem";

const Navigation = ({ loggedin, onLogout }) => {
  let logginSec;
  if (!loggedin) {
    logginSec = (
      <>
        <NavItem link="login" />
        <NavItem link="register" />
      </>
    );
  } else {
    logginSec = <Logout onLogout={onLogout} />;
  }
  return <div> {logginSec} </div>;
};

export default Navigation;
