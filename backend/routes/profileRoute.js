const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, level, goal, days } = req.body;

  console.log(`Saved profile for user ${userId}`, { level, goal, days });
  res.json({ success: true });
});

module.exports = router;
