import React from 'react';

import '../styles/Policy.css'; // Import CSS file for styling
import Layoutt from '../components/Layout/Layoutt';
import "../styles/Homepage.css"

const Policy = () => {
  return (
    <div className='allPage'>
    <Layoutt title={"Contact us - BeautyStore"}>
    <div className="row contactus ">
    <div className="col-md-6 ">
      <img
        src="privacy.png"
        alt="contactus"
        style={{ width: "100%" }}
      />
    </div>
    <div className="col-md-4">
      <div className='contactcard'>
      <h1 className="contactus1 p-2 text-white text-center">PRIVACY POLICY</h1>

            <p className="text-justify mt-2">
            Our Privacy Policy outlines how we collect, use, and secure the information you provide to us. When you visit our website or make a purchase, we may collect details such as your name, contact information, payment details, and browsing behavior. This information is used solely to enhance your shopping experience, process transactions, and keep you informed about your orders and special offers.
      </p>
      
      </div>

    </div>
  </div>
    </Layoutt>
    </div>
  );
};

export default Policy;
