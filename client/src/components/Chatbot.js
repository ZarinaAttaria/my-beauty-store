import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';
import icon from './icon.webp'

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/chatbot/messages', { text: input, sender: 'User' });
      setMessages([...messages, { text: input, sender: 'User' }, { text: response.data.response, sender: 'Bot' }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="body">
    <div className="chatbot">
      <div className="header">
        <img src={icon} alt="DP" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        <h2>AI Recommendation</h2>
      </div>
      <div className="chat-window">
        <div className="message-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
    </div>
  );
}

export default Chatbot;
