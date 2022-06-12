import React, { useContext, useEffect, useState } from "react";
import { addPlan, getAllLevels, getAllTags } from "../networking/Networking";
import NewPlanForm from "./NewPlanForm";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

const NewPlan = ({ setFlashMessage }) => {
  const [user] = useContext(UserContext);
  const [levels, setLevels] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  if (!user || !user.token) {
    navigate("/");
  }

  useEffect(() => {
    const getLevels = async () => {
      const l = await getAllLevels(user.token);
      if (!l.error) {
        setLevels(l);
      }
    };
    getLevels();
  }, [user.token]);

  useEffect(() => {
    const getTags = async () => {
      const t = await getAllTags(user.token);
      if (!t.error) {
        setTags(t);
      }
    };
    getTags();
  }, [user.token]);

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
  return <NewPlanForm savePlan={savePlan} levels={levels} tag={tags} />;
};

export default NewPlan;
