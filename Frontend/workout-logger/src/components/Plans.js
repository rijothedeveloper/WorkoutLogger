import { fetchPlans } from "../networking/Networking";
import { useState, useEffect, useContext } from "react";
import PlansInfo from "./PlansInfo";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [user] = useContext(UserContext);
  const navigate = useNavigate();

  // navigate to home if user is not logged in or token expaired
  if (!user || !user.token) {
    navigate("/");
  }

  useEffect(() => {
    const getPlans = async () => {
      if (user.token) {
        const plans = await fetchPlans(user.token);
        setPlans(plans);
      } else {
        setPlans([]);
      }
    };
    getPlans();
  }, [user.token]);

  if (plans.error && plans.error.message === "jwt expired") {
    navigate("/login");
  }

  return (
    <>
      <h2>Plans</h2>
      <PlansInfo plans={plans} />
    </>
  );
};

export default Plans;
