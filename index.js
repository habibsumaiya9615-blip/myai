require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static('public'));
const API_KEY = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(userMessage);
    const response = result.response.text();
    res.json({ success: true, reply: response });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});
app.listen(3000, () => console.log('চালু আছে: http://localhost:3000'));
