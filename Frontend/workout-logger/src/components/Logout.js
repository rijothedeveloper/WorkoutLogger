import { useNavigate } from "react-router-dom";

export const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  const logout = () => {
    onLogout();
    navigate("/");
  };
  return <button onClick={logout}>Logout</button>;
};
