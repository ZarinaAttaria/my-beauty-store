// TermsConditions.js
import React from 'react';
import Layoutt from '../components/Layout/Layoutt';
import "../styles/Homepage.css"


const TermsConditions = () => {
  return (
    <div className='allPage'>
      <Layoutt title={"Terms & Conditions - BeautyStore"}>
        <div className='pagePad'>

        <h1>Terms & Conditions</h1>
        <div className="terms">
          <h2>Introduction</h2>
          <p>Welcome to BeautyStore. By accessing this website, we assume you accept these terms and conditions...</p>
          <h2>Usage</h2>
          <p>Use this website at your own risk. The content on this website is for general information purposes only...</p>
          <h2>Intellectual Property</h2>
          <p>All content included on this site, such as text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of BeautyStore...</p>
          <h2>Shipping</h2>
          <p>We offer standard and express shipping options. Delivery times may vary depending on your location...</p>
          <h2>Returns and Exchanges</h2>
          <p>We accept returns and exchanges within 30 days of purchase. Items must be unused and in their original packaging...</p>
      
        </div>
        </div>

      </Layoutt>
    </div>
  );
}

export default TermsConditions;
