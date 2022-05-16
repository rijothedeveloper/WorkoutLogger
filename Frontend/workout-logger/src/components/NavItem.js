import { Link } from "react-router-dom";

const NavItem = ({ link }) => {
  return <Link to={link}>{link} </Link>;
};

export default NavItem;
