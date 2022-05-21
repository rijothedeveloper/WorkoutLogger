import { fetchUserInfo } from "../networking/Networking";
import { useEffect, useState } from "react";

const UserInfo = ({ token }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUserInfo = async () => {
      if (token) {
        const u = await fetchUserInfo(token);
        setUser(u);
      }
    };
    getUserInfo(token);
  }, [token]);

  return (
    <div>
      <h3>{user.firstname}</h3>
      <h3>{user.lastname}</h3>
      <h3>{user.username}</h3>
      <h3>{user.height}</h3>
      <h3>{user.weight}</h3>
    </div>
  );
};

export default UserInfo;
