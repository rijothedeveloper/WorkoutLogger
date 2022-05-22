import Plan from "./Plan";
import { fetchPlans } from "../networking/Networking";
import { useState, useEffect } from "react";
import PlansInfo from "./PlansInfo";

function SavedPlans({ username, token }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const getPlans = async () => {
      if (token) {
        const plans = await fetchPlans(token, null, "rijo");
        setPlans(plans);
      } else {
        setPlans([]);
      }
    };
    getPlans();
  }, [token]);

  return <PlansInfo plans={plans} />;
}

export default SavedPlans;
