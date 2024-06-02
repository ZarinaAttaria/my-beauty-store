// server/routes/chatbot.js
import express from 'express';
const router = express.Router();
import Message from '../models/Message.js'; 
import { spawn } from 'child_process';


// Handle incoming messages
router.post('/messages', async (req, res) => {
  const { text, sender } = req.body;

  // Save incoming message to the database
  const newMessage = new Message({ text, sender });
  await newMessage.save();

  // Call Python script to generate response
  const response = await generateResponse(text);

  // Save chatbot response to the database
  const botMessage = new Message({ text: response, sender: 'Bot' });
  await botMessage.save();

  res.json({ response });
});

function generateResponse(message) {
  return new Promise((resolve, reject) => {
    const process = spawn('python', ['chatbot/chatbot.py', message]);

    process.stdout.on('data', (data) => {
      resolve(data.toString().trim());
    });

    process.stderr.on('data', (data) => {
      reject(data.toString());
    });
  });
}

export default router;

