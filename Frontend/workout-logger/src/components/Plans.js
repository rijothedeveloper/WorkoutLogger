import { fetchPlans } from "../networking/Networking";
import { useState, useEffect } from "react";
import PlansInfo from "./PlansInfo";
import { useNavigate } from "react-router-dom";

const Plans = ({ token }) => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getPlans = async () => {
      if (token) {
        const plans = await fetchPlans(token);
        setPlans(plans);
      } else {
        setPlans([]);
      }
    };
    getPlans();
  }, [token]);

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
