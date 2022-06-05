import { useState, useEffect, useContext } from "react";
import { fetchbookmarkedPlans } from "../networking/Networking";
import UserContext from "../UserContext";
import PlansInfo from "./PlansInfo";

const BookmarkedPlans = () => {
  const [plans, setPlans] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    const getPlans = async () => {
      if (user.token) {
        const plans = await fetchbookmarkedPlans(user.token);
        setPlans(plans);
      } else {
        setPlans([]);
      }
    };
    getPlans();
  }, [user]);

  return (
    <>
      <h2>My Bookmarked Plans</h2>
      <PlansInfo plans={plans} />
    </>
  );
};

export default BookmarkedPlans;
