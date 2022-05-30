import { fetchPlans } from "../networking/Networking";
import { useState, useEffect, useContext } from "react";
import PlansInfo from "./PlansInfo";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [user] = useContext(UserContext);
  const navigate = useNavigate();
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
