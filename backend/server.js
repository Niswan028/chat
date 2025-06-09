const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const chatbotRoute = require('./routes/chatbotRoute'); // ✅ use correct naming

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chatbot', chatbotRoute); // ✅ use correct path prefix

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const profileRoute = require('./routes/profileRoute');
app.use('/api/profile', profileRoute);

