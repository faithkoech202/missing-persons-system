const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/match
router.post('/', async (req, res) => {
  const { gender, age_estimate, found_location, physical_description } = req.body;

  try {
    const sql = `
      SELECT * FROM missing_persons
      WHERE gender = ?
      AND ABS(TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) - ?) <= 5
      AND last_seen_location LIKE ?
      AND physical_description LIKE ?
    `;

    const [matches] = await db.query(sql, [
      gender,
      age_estimate,
      `%${found_location}%`,
      `%${physical_description}%`
    ]);

    if (matches.length === 0) {
      return res.status(404).json({ message: 'No potential match found' });
    }

    res.json({ matches });
  } catch (error) {
    console.error('Error while matching:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
