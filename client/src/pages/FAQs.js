// FAQs.js
import React from 'react';
import Layoutt from '../components/Layout/Layoutt';
import "../styles/Homepage.css"


const FAQs = () => {
  return (
    <div className='allPage'>
      <Layoutt title={"FAQs - BeautyStore"}>
      <div className='pagePad'>
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          <div className="faq-item">
            <h3>Question 1: How can I track my order?</h3>
            <p>Answer: You can track your order by visiting the "Track Order" page and entering your order details.</p>
          </div>
          <div className="faq-item">
            <h3>Question 2: What payment methods do you accept?</h3>
            <p>Answer: We accept credit/debit cards, PayPal, and cash on delivery for payment.</p>
          </div>
          <div className="faq-item">
            <h3>Question 3: Do you offer international shipping?</h3>
            <p>Answer: Yes, we offer international shipping to select countries. Please check our shipping policy for more details.</p>
          </div>
          <div className="faq-item">
            <h3>Question 4: How can I return or exchange a product?</h3>
            <p>Answer: You can initiate a return or exchange by contacting our customer support team within 30 days of receiving your order.</p>
          </div>
          {/* Add more FAQ items as needed */}
        </div>
    </div>

      </Layoutt>
    </div>
  );
}

export default FAQs;
