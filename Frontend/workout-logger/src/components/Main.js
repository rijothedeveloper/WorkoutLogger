import UserContext from "../UserContext";
import { useContext } from "react";
import Banner from "./Banner";

const Main = () => {
  const [user] = useContext(UserContext);
  function outPut() {
    return (
      <>
        <Banner />
      </>
    );
  }
  return outPut();
};

export default Main;
