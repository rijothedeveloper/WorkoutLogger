import { fetchPlans } from "../networking/Networking";
import { useState, useEffect } from "react";
import PlansInfo from "./PlansInfo";

const Plans = ({ token }) => {
  const [plans, setPlans] = useState([]);

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

  return <PlansInfo plans={plans} />;
};

export default Plans;
