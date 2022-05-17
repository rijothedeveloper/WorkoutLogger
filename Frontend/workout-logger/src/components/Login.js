import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormData = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const navigate = useNavigate();
  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin(formData);
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        User Name:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleFormData}
        />
      </label>
      <label>
        password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormData}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
