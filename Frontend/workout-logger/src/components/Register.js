import { useState } from "react";

const Register = ({ handleRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    height: "",
    weight: "",
  });

  const onChangeForm = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <form onSubmit={handleRegister}>
      <label>
        User Name:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={onChangeForm}
        />
      </label>
      <label>
        password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChangeForm}
        />
      </label>
      <label>
        Height:
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={onChangeForm}
        />
      </label>
      <label>
        weight:
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={onChangeForm}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Register;
