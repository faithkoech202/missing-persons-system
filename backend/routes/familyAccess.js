const express = require('express');
const router = express.Router();
const db = require('../config/db'); // this should be your pool

router.get('/:accessCode', async (req, res) => {
  const code = req.params.accessCode;

  try {
    const [results] = await db.query('SELECT * FROM missing_persons WHERE access_code = ?', [code]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(results[0]);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
