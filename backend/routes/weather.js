const express = require('express');
const axios = require('axios');
const router = express.Router();
// GET /api/weather?city=Mumbai
router.get('/', async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'city query param required' });
  const key = process.env.OPENWEATHER_KEY;
  try {
    if (key) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${key}`;
      const r = await axios.get(url);
      const d = r.data;
      return res.json({ city: d.name, temp: d.main.temp, description: d.weather[0].description });
    } else {
      return res.json({ city, temp: 28, description: 'clear sky (mocked)' });
    }
  } catch (err) {
    if (err.response && err.response.status === 404) return res.status(404).json({ error: 'city not found' });
    return res.status(500).json({ error: 'weather service error' });
  }
});
module.exports = router;
