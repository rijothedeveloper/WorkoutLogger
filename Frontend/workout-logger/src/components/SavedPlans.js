import Plan from "./Plan";
import { fetchPlans } from "../networking/Networking";
import { useState, useEffect } from "react";
import PlansInfo from "./PlansInfo";
import { useNavigate } from "react-router-dom";

function SavedPlans({ username, token }) {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

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

  if (plans.error) {
    // navigate("/login");
  }

  return (
    <>
      <h2>My Plans</h2>
      <PlansInfo plans={plans} />
    </>
  );
}

export default SavedPlans;
