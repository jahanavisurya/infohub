const express = require('express');
const router = express.Router();
const quotes = [
  'Believe you can and you\'re halfway there. — Theodore Roosevelt',
  'The only way to do great work is to love what you do. — Steve Jobs',
  'You miss 100% of the shots you don\'t take. — Wayne Gretzky',
  'Don\'t watch the clock; do what it does. Keep going. — Sam Levenson'
];
router.get('/', (req, res) => {
  const q = quotes[Math.floor(Math.random()*quotes.length)];
  res.json({ quote: q });
});
module.exports = router;
