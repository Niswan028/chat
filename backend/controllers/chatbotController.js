const axios = require('axios');

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
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // optional
          'X-Title': 'FitnessChatbot',              // optional
        },
      }
    );

    const botReply = response.data.choices[0].message.content;
    res.json({ response: botReply });
  } catch (error) {
    console.error('Error talking to OpenRouter:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from chatbot.' });
  }
};

module.exports = chatbot;
