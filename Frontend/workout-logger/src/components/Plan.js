import { Link } from "react-router-dom";
import fitnessImage from "../images/fitness.jpeg";
import bookmarkPlusIcon from "../images/bookmarkPlusIcon.svg";
import bookmarkRemoveIcon from "../images/bookmarkRemoveIcon.svg";
import { bookmarkPlan } from "../networking/Networking";
import UserContext from "../UserContext";
import { useContext } from "react";

const Plan = ({ plan }) => {
  const [user] = useContext(UserContext);
  const bookmarkClicked = async (evt) => {
    console.log("bookmarkClicked");
    const result = await bookmarkPlan(user.token, plan.id);
  };
  return (
    <div className="card cursor">
      <figure>
        <Link to={"/plans/" + plan.id}>
          {plan.imgurl ? (
            <img src={plan.imgurl} height="200px" />
          ) : (
            <img src={fitnessImage} height="200px" />
          )}
        </Link>

        <figcaption>
          <h3>{plan.name}</h3>
        </figcaption>
      </figure>
      <img
        src={bookmarkPlusIcon}
        height="30px"
        onClick={bookmarkClicked}
        class="iconTop"
      />
    </div>
  );
};

export default Plan;
