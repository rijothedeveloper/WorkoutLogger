import Navigation from "./Navigation";

const Header = ({ loggedin, onLogout, username }) => {
  return (
    <Navigation loggedin={loggedin} onLogout={onLogout} username={username} />
  );
};

export default Header;
