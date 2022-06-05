import { Link } from "react-router-dom";
import fitnessImage from "../images/fitness.jpeg";
import bookmarkPlusIcon from "../images/bookmarkPlusIcon.svg";
import bookmarkRemoveIcon from "../images/bookmarkRemoveIcon.svg";
import { bookmarkPlan, removeBookmarkPlan } from "../networking/Networking";
import UserContext from "../UserContext";
import { useContext, useRef } from "react";

const Plan = ({ plan }) => {
  const [user] = useContext(UserContext);
  const bookButton = useRef(null);
  const bookmarkClicked = async (evt) => {
    console.log("bookmarkClicked");
    if (plan.booked) {
      const result = await removeBookmarkPlan(user.token, plan.id);
      bookButton.current.src = bookmarkPlusIcon;
    } else {
      const result = await bookmarkPlan(user.token, plan.id);
      bookButton.current.src = bookmarkRemoveIcon;
    }
  };
  return (
    <div className="card cursor">
      <Link to={"/plans/" + plan.id}>
        <figure>
          {plan.imgurl ? (
            <img src={plan.imgurl} height="200px" />
          ) : (
            <img src={fitnessImage} height="200px" />
          )}

          <figcaption>
            <h3>{plan.name}</h3>
          </figcaption>
        </figure>
      </Link>
      <img
        ref={bookButton}
        src={plan.booked ? bookmarkRemoveIcon : bookmarkPlusIcon}
        height="30px"
        onClick={bookmarkClicked}
        class="iconTop"
      />
    </div>
  );
};

export default Plan;
