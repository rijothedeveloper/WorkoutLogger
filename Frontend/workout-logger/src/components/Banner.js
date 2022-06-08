import React from "react";
import bannerImg from "../images/banner.png";
import fitnessIcon from "../images/fitnessIcon.png";
import healthIcon from "../images/healthIcon.png";
import nutritionIcon from "../images/nutritionIcon.png";
import fitnessTagImg from "../images/fitnessTag.png";

const Banner = () => {
  return (
    <div className="banner">
      <div className="bannerContent">
        <div className="bannerDetails">
          <h4>Welcome to Workout Logger</h4>
          <h1>Workout plan</h1>
          <h1>Builder</h1>
          <div className="banner-icons">
            <img src={fitnessIcon} alt="fitness icon" />
            <h4>FITNESS</h4>
            <img src={healthIcon} alt="fitness icon" />
            <h4>HEALTH</h4>
            <img src={nutritionIcon} alt="fitness icon" />
            <h4>NUTRITION</h4>
          </div>
          <h4>FOR FREE GYM & FITNESS PROGRAM</h4>
          <button>Click Here</button>
        </div>
        <div className="bannerImg">
          <img src={bannerImg} alt="banner burned man" />
        </div>
      </div>
      <div className="bannerTag">
        <img src={fitnessTagImg} alt="fitness tags" />
      </div>
    </div>
  );
};

export default Banner;
