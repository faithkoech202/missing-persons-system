// GET /api/match-bodies
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/match-bodies', async (req, res) => {
  const sql = `
    SELECT 
      mp.id AS missing_id,
      mp.full_name AS missing_name,
      ub.id AS body_id,
      ub.description AS body_description,
      ub.found_location
    FROM 
      missing_persons mp
    JOIN 
      unidentified_bodies ub
    ON 
      mp.gender = ub.gender
      AND ABS(DATEDIFF(mp.date_last_seen, ub.date_found)) <= 14
      AND mp.last_seen_location = ub.found_location
  `;

  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error matching bodies:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

