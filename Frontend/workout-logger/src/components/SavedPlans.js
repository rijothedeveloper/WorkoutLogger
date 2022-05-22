import Plan from "./Plan";
import { fetchPlans } from "../networking/Networking";
import { useState, useEffect } from "react";

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

  const planElements = plans.map((e) => <Plan plan={e} />);

  return (
    <div>
      <h2>My Plans</h2>
      {token && <button>create a plan</button>}
      <div className="card-raw">{planElements}</div>
    </div>
  );
}

export default SavedPlans;
