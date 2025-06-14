const express = require('express');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const chatbotRoute = require('./routes/chatbot'); // ✅ Import chatbot route

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chatbot', chatbotRoute); // ✅ Add this

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
