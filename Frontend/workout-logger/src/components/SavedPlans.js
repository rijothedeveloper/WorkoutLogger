import Plan from "./Plan";
import { fetchPlans } from "../networking/Networking";
import { useState, useEffect, useContext } from "react";
import PlansInfo from "./PlansInfo";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function SavedPlans() {
  const [plans, setPlans] = useState([]);
  const [user] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlans = async () => {
      if (user.token) {
        const plans = await fetchPlans(user.token, null, user.username);
        setPlans(plans);
      } else {
        setPlans([]);
      }
    };
    getPlans();
  }, [user]);

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
