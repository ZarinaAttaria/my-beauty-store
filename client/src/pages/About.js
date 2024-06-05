import React from "react";
import Layoutt from "../components/Layout/Layoutt";
import "../styles/Homepage.css"

const About = () => {
  return (
    <div className='allPage'>
    <Layoutt title={"Contact us - BeautyStore"}>
    <div className="row contactus ">
    <div className="col-md-6 ">
      <img
        src="about.png"
        alt="contactus"
        style={{ width: "100%" }}
      />
    </div>
    <div className="col-md-4">
      <div className='contactcard'>
      <h1 className="contactus1 p-2 text-white text-center">ABOUT US</h1>

            <p className="text-justify mt-2">
            Welcome to our Beauty Store! At Beauty Store, we believe that beauty is not just about how you look, but also about how you feel. Our mission is to empower individuals to embrace their unique beauty and express themselves with confidence. We strive to provide our customers with the tools they need to enhance their natural beauty and unleash their inner radiance.
      </p>
      
      </div>

    </div>
  </div>
    </Layoutt>
    </div>
  );
};

export default About;
