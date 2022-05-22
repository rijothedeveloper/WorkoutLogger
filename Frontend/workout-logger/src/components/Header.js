import Navigation from "./Navigation";

const Header = ({ loggedin, handleLogout, username }) => {
  return (
    <Navigation
      loggedin={loggedin}
      onLogout={handleLogout}
      username={username}
    />
  );
};

export default Header;
