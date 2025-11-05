const express = require("express");
const axios = require("axios");
const router = express.Router();

// ✅ GET /api/convert?amount=100&from=INR&to=USD
router.get("/", async (req, res) => {
  const { amount = "1", from, to } = req.query;

  if (!from || !to)
    return res.status(400).json({ error: "from and to query params required" });

  const num = Number(amount);
  if (isNaN(num))
    return res.status(400).json({ error: "amount must be a number" });

  try {
    // 🟢 Try real API
    const url = `https://api.exchangerate.host/convert?from=${encodeURIComponent(
      from
    )}&to=${encodeURIComponent(to)}&amount=${num}`;

    const r = await axios.get(url);

    if (r.data && r.data.result != null) {
      return res.json({
        query: r.data.query,
        result: r.data.result,
        mocked: false,
      });
    } else {
      // ⚠️ API gave invalid data → fallback
      const rates = { INR_USD: 0.012, INR_EUR: 0.011 };
      const key = `${from}_${to}`;
      const rate = rates[key] || 0.01;
      return res.json({
        query: { from, to, amount: num },
        result: +(num * rate).toFixed(4),
        mocked: true,
        error: "Invalid API response — fallback used",
      });
    }
  } catch (err) {
    // 🔴 Network or API error → fallback
    console.error("Conversion error:", err.message);
    const rates = { INR_USD: 0.012, INR_EUR: 0.011 };
    const key = `${from}_${to}`;
    const rate = rates[key] || 0.01;
    return res.json({
      query: { from, to, amount: num },
      result: +(num * rate).toFixed(4),
      mocked: true,
      error: "API call failed — fallback used",
    });
  }
});

module.exports = router;


