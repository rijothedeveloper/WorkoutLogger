import React from "react";
import { addPlan } from "../networking/Networking";
import NewPlanForm from "./NewPlanForm";

const NewPlan = ({ token, setFlashMessage }) => {
  const savePlan = (plan) => {
    const result = addPlan(token, plan);
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
  return <NewPlanForm token={token} savePlan={savePlan} />;
};

export default NewPlan;
