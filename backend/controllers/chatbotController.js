const axios = require('axios');
require('dotenv').config(); 

const chatbot = async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/devstral-small:free',
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'FitnessChatbot',             
        },
      }
    );

    const botReply = response.data.choices[0].message.content;
    res.json({ response: botReply });
  } catch (error) {
    console.error('OpenRouter error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from chatbot.' });
  }
};

module.exports = chatbot;
