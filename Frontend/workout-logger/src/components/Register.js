import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ handleRegister }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    await handleRegister(formData);
    navigate("/");
  };

  return (
    <form method="post" onSubmit={onSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={onChangeForm}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={onChangeForm}
        />
      </label>
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
