import { Link } from "react-router-dom";

const NavItem = ({ link, title }) => {
  if (!title) title = link;
  return <Link to={link}>{title} </Link>;
};

export default NavItem;
