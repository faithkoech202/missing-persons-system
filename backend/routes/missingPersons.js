const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyPolice } = require('../middlewares/auth');

// POST /api/missing-persons
router.post('/', verifyPolice, async (req, res) =>  {
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

// GET all missing persons
router.get('/', async (req, res) => {
  try {
    const sql = 'SELECT * FROM missing_persons ORDER BY date_reported DESC';
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching missing persons:', err);
    res.status(500).json({ message: 'Server error while retrieving data' });
  }
});

// GET details of a single missing person by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sql = 'SELECT * FROM missing_persons WHERE id = ?';
    const [rows] = await db.query(sql, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Missing person not found' });
    }
  } catch (err) {
    console.error('Error fetching missing person by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE missing person by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const sql = `
      UPDATE missing_persons SET 
        full_name = ?, date_of_birth = ?, gender = ?, nationality = ?, ethnicity = ?, 
        occupation = ?, height = ?, weight = ?, eye_color = ?, hair_color = ?, 
        distinguishing_marks = ?, medical_conditions = ?, clothing = ?, 
        jewelry = ?, last_seen_location = ?, date_last_seen = ?, 
        with_person = ?, doing_what = ?, phone = ?, social_media = ?, 
        hangouts = ?, known_contacts = ?, behavior = ?, possible_reasons = ?, 
        recent_events = ?, enemies = ?, reporter_name = ?, reporter_relationship = ?, 
        reporter_phone = ?, reporter_email = ?, reporter_address = ?, 
        reporter_national_id = ?, police_case_number = ?, medical_report = ?, 
        dental_records = ?, photo = ?
      WHERE id = ?
    `;

    const values = [
      updatedData.full_name, updatedData.date_of_birth, updatedData.gender, updatedData.nationality, updatedData.ethnicity,
      updatedData.occupation, updatedData.height, updatedData.weight, updatedData.eye_color, updatedData.hair_color,
      updatedData.distinguishing_marks, updatedData.medical_conditions, updatedData.clothing,
      updatedData.jewelry, updatedData.last_seen_location, updatedData.date_last_seen,
      updatedData.with_person, updatedData.doing_what, updatedData.phone, updatedData.social_media,
      updatedData.hangouts, updatedData.known_contacts, updatedData.behavior, updatedData.possible_reasons,
      updatedData.recent_events, updatedData.enemies, updatedData.reporter_name, updatedData.reporter_relationship,
      updatedData.reporter_phone, updatedData.reporter_email, updatedData.reporter_address,
      updatedData.reporter_national_id, updatedData.police_case_number, updatedData.medical_report,
      updatedData.dental_records, updatedData.photo, id
    ];

    const [result] = await db.query(sql, values);

    if (result.affectedRows > 0) {
      res.json({ message: 'Missing person updated successfully' });
    } else {
      res.status(404).json({ message: 'Missing person not found' });
    }
  } catch (err) {
    console.error('Error updating missing person:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET /api/missing-persons/family-access/:access_code
router.get('/family-access/:access_code', async (req, res) => {
  const { access_code } = req.params;

  try {
    const sql = `SELECT * FROM missing_persons WHERE access_code = ?`;
    const [rows] = await db.query(sql, [access_code]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No missing person found with this access code' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching missing person by access code:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/missing-persons/search?query=...
router.get('/search', async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  const sql = `
    SELECT * FROM missing_persons
    WHERE full_name LIKE ? OR last_seen_location LIKE ?
  `;
  const searchTerm = `%${query}%`;

  try {
    const [results] = await db.query(sql, [searchTerm, searchTerm]);
    res.json(results);
  } catch (err) {
    console.error('Error in search:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
