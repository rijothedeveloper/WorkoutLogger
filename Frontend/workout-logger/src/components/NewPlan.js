import React, { useContext } from "react";
import { addPlan } from "../networking/Networking";
import NewPlanForm from "./NewPlanForm";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

const NewPlan = ({ setFlashMessage }) => {
  const [user] = useContext(UserContext);
  const navigate = useNavigate();

  if (!user.token) {
    navigate("/");
  }
  const savePlan = (plan) => {
    const result = addPlan(user.token, plan);
    if (result) {
      setFlashMessage({
        show: true,
        message: "Plan successfully added",
        color: "#089e79",
      });
    } else {
      setFlashMessage({
        show: true,
        message: "Plan adding error",
        color: "red",
      });
    }
  };
  return <NewPlanForm savePlan={savePlan} />;
};

export default NewPlan;
