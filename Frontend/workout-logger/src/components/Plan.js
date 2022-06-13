import { Link } from "react-router-dom";
import fitnessImage from "../images/fitness.jpeg";
import bookmarkPlusIcon from "../images/bookmarkPlusIcon.svg";
import bookmarkRemoveIcon from "../images/bookmarkRemoveIcon.svg";
import { bookmarkPlan, removeBookmarkPlan } from "../networking/Networking";
import UserContext from "../UserContext";
import { useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

const Plan = ({ plan }) => {
  const [user] = useContext(UserContext);
  const bookButton = useRef(null);
  const bookmarkClicked = async (evt) => {
    console.log("bookmarkClicked");
    if (plan.booked) {
      const result = await removeBookmarkPlan(user.token, plan.id);
      // bookButton.current.src = bookmarkPlusIcon;
    } else {
      const result = await bookmarkPlan(user.token, plan.id);
      // bookButton.current.src = bookmarkRemoveIcon;
    }
  };
  const tagElements = plan.tags.map((t) => (
    <span className="tag">{t + ", "}</span>
  ));
  return (
    // <div className="card cursor">
    //   <Link to={"/plans/" + plan.id}>
    //     <figure>
    //       {plan.imgurl ? (
    //         <img src={plan.imgurl} height="200px" />
    //       ) : (
    //         <img src={fitnessImage} height="200px" />
    //       )}

    //       <figcaption>
    //         <h3>{plan.name}</h3>
    //       </figcaption>
    //     </figure>
    //   </Link>
    //   <img
    //     ref={bookButton}
    //     src={plan.booked ? bookmarkRemoveIcon : bookmarkPlusIcon}
    //     height="30px"
    //     onClick={bookmarkClicked}
    //     class="iconTop"
    //   />
    // </div>
    <div className="card">
      <div className="thumbnail">
        <Link to={"/plans/" + plan.id}>
          {plan.imgurl ? <img src={plan.imgurl} /> : <img src={fitnessImage} />}
        </Link>
      </div>
      <div className="detail">
        <div className="heading">
          <h2>{plan.name}</h2>
          <div className="category">{plan.level + " Level"}</div>
          <div className="tags">
            <FontAwesomeIcon icon={faPerson} />
            {tagElements}
          </div>
        </div>
        <div className="button-raw">
          <div className="detailBtn">
            <button>Details</button>
          </div>
          <div className="saveBtn" onClick={bookmarkClicked}>
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
