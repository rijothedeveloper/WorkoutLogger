import { fetchUserInfo } from "../networking/Networking";
import { useEffect, useState } from "react";

const UserInfo = ({ token }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUserInfo = async () => {
      if (token) {
        const u = await fetchUserInfo(token);
        setUser(u);
        setFormData({
          firstName: u.firstName,
          lastName: u.lastName,
          username: u.username,
          password: "",
          height: u.height,
          weight: u.weight,
        });
      }
    };
    getUserInfo(token);
  }, [token]);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: "",
    height: user.height,
    weight: user.weight,
  });

  const onChangeForm = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
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
        <input type="text" name="username" value={formData.username} />
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
      <input type="submit" value="Save" />
    </form>
  );

  // return (
  //   <div>
  //     <h3>{user.firstname}</h3>
  //     <h3>{user.lastname}</h3>
  //     <h3>{user.username}</h3>
  //     <h3>{user.height}</h3>
  //     <h3>{user.weight}</h3>
  //   </div>
  // );
};

export default UserInfo;
