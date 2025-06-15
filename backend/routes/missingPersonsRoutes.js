const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/missing-persons
router.post('/', (req, res) => {
  const {
    full_name,
    date_of_birth,
    gender,
    height,
    weight,
    eye_color,
    hair_color,
    complexion,
    physical_marks,
    last_seen_location,
    last_seen_date,
    last_seen_wearing,
    behavior_notes,
    contact_name,
    contact_phone,
    reporter_name,
    reporter_relation,
    date_reported
  } = req.body;

  const sql = `
    INSERT INTO missing_persons (
      full_name, date_of_birth, gender, height, weight, eye_color,
      hair_color, complexion, physical_marks, last_seen_location,
      last_seen_date, last_seen_wearing, behavior_notes,
      contact_name, contact_phone, reporter_name,
      reporter_relation, date_reported
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    full_name,
    date_of_birth,
    gender,
    height,
    weight,
    eye_color,
    hair_color,
    complexion,
    physical_marks,
    last_seen_location,
    last_seen_date,
    last_seen_wearing,
    behavior_notes,
    contact_name,
    contact_phone,
    reporter_name,
    reporter_relation,
    date_reported
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Failed to add missing person' });
    }

    res.status(201).json({ message: 'Missing person added successfully', id: result.insertId });
  });
});

router.get('/family-access/:access_code', async (req, res) => {
  const { access_code } = req.params;
  const sql = 'SELECT * FROM missing_persons WHERE access_code = ?';
  try {
    const [rows] = await db.query(sql, [access_code]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'No record found for this code' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err });
  }
});

module.exports = router;
