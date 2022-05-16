import { useState } from "react";

const Login = (handleLogin) => {
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

  return (
    <form onSubmit={handleLogin}>
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
