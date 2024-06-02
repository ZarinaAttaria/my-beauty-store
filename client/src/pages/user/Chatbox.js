// ChatBox.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Chatbox.css"; // Import CSS file for styling
import ChatImg from './ChatImg.png'

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`chat-icon ${isOpen ? 'open' : ''}`} onClick={toggleChatBox}>
        <img src={ChatImg} alt="Chat Icon" />
      </div>
      <div className={`chat-box ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <h3>Need Recommendation?</h3>
        </div>
        <div className="chat-body">
          {/* Chat body content */}
        </div>
        <div className="chat-footer">
          {/* Use Link to navigate to the chatbot page */}
          <Link to="/chatbot">
            <button className="chat-button">Chat Now</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
