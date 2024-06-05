import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css";

import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Footer = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve email from local storage when component mounts
    const storedEmail = localStorage.getItem('newsletterEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSocialIconClick = (socialPlatform) => {
    console.log(`Clicked on ${socialPlatform}`);
    // Add logic to redirect users to respective social media pages
    switch (socialPlatform) {
      case "Facebook":
        window.location.href = "https://www.facebook.com/";
        break;
      case "Twitter":
        window.location.href = "https://twitter.com/";
        break;
      case "Instagram":
        window.location.href = "https://www.instagram.com/";
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Email submitted:', email);
 
    localStorage.setItem('newsletterEmail', email);
   toast.success("Registered successfully! We will keep you updated about our products & promotions")
    setEmail('');
  };

  return (
    <div className="footer-container">
      <div className="footer-section footer-section1">
        <h3>Contact</h3>
        <p>Islamabad, Pakistan.</p>
        <p>Call: +923000725776</p>
        <p>support@beautyStore.pk</p>
      </div>
      <div className="footer-section footer-section2">
        <h3>Information</h3>
        <ul>
          <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
          <li><Link to="/faqs" className="footer-link">FAQs</Link></li>
          <li><Link to="/about" className="footer-link">About Us</Link></li>
          <li><Link to="/policy" className="footer-link">Privacy & Cookie Policy</Link></li>
          <li><Link to="/terms-condition" className="footer-link">Terms & Condition</Link></li>
        </ul>
      </div>
      <div className="footer-section footer-section3">
        <div className="follow-us">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="#"
              onClick={() => handleSocialIconClick("Facebook")}
              className="social-icon"
            >
              <AiFillFacebook />
            </a>
            <a
              href="#"
              onClick={() => handleSocialIconClick("Twitter")}
              className="social-icon"
            >
              <AiFillTwitterSquare />
            </a>
            <a
              href="#"
              onClick={() => handleSocialIconClick("Instagram")}
              className="social-icon"
            >
              <AiFillInstagram />
            </a>
          </div>
          <p>Newsletter Sign Up</p>
          <p>Receive our latest updates about our products & promotions.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              className='emailinput'
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="footer-section footer-section4">
        <p>© 2024,  Beauty Store. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
