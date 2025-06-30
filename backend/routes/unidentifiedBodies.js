const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Set up storage for photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST /api/unidentified-bodies
router.post('/', upload.single('photo'), async (req, res) => {
  const {
    gender,
    age_estimate,
    found_location,
    date_found,
    physical_description,
    hospital_name,
    hospital_contact
  } = req.body;

  const photo = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO unidentified_bodies 
    (gender, age_estimate, found_location, date_found, physical_description, photo, hospital_name, hospital_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await db.query(sql, [
      gender,
      age_estimate,
      found_location,
      date_found,
      physical_description,
      photo,
      hospital_name,
      hospital_contact
    ]);

    res.status(201).json({ message: 'Unidentified body reported successfully' });
  } catch (err) {
    console.error('Database insert error:', err);
    res.status(500).json({ message: 'Failed to report unidentified body' });
  }
});

// GET route to list all unidentified bodies
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM unidentified_bodies ORDER BY date_found DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching unidentified bodies:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET a single unidentified body by ID
// GET /api/unidentified-bodies/search?gender=male&body_found_location=Nakuru
router.get('/search', async (req, res) => {
  const { date_found, gender, body_found_location } = req.query;

  let sql = 'SELECT * FROM unidentified_bodies WHERE 1=1';
  const params = [];

  if (gender) {
    sql += ' AND gender = ?';
    params.push(gender);
  }

  if (date_found) {
    sql += ' AND date_found = ?';
    params.push(date_found);
  }

  if (body_found_location) {
    sql += ' AND body_found_location LIKE ?';
    params.push(`%${body_found_location}%`);
  }

  try {
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Error performing search:', err);
    res.status(500).json({ message: 'Server error during search' });
  }
});

module.exports = router;
