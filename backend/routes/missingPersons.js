const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middlewares/auth');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/missing-persons
router.post('/', verifyToken, upload.single('photo'), (req, res) => {
  const {
    full_name,
    date_of_birth,
    gender,
    last_seen_location,
    date_last_seen,
    reporter_name,
    reporter_phone,
    distinguishing_marks,
    medical_conditions,
    social_media,
    description
  } = req.body;

  const photoBuffer = req.file ? req.file.buffer : null;
  const access_code = uuidv4().slice(0, 8); // 8-character unique code

  const sql = `
    INSERT INTO missing_persons (
      full_name,
      date_of_birth,
      gender,
      last_seen_location,
      date_last_seen,
      reporter_name,
      reporter_phone,
      distinguishing_marks,
      medical_conditions,
      social_media,
      description,
      photo,
      access_code
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    full_name,
    date_of_birth,
    gender,
    last_seen_location,
    date_last_seen,
    reporter_name,
    reporter_phone,
    distinguishing_marks,
    medical_conditions,
    social_media,
    description,
    photoBuffer,
    access_code
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('MySQL Error:', err.sqlMessage || err);
      return res.status(500).json({ message: 'Failed to add missing person' });
    }

    res.status(201).json({
      message: 'Missing person added successfully',
      id: result.insertId,
      access_code
    });
  });
});

// GET /api/missing-persons
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM missing_persons ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching missing persons:', err.message);
    res.status(500).json({ message: 'Server error while retrieving data' });
  }
});

// GET /api/missing-persons/:id
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

// GET /api/missing-persons/family-access/:access_code
router.get('/family-access/:access_code', async (req, res) => {
  const { access_code } = req.params;

  try {
    const sql = 'SELECT * FROM missing_persons WHERE access_code = ?';
    const [rows] = await db.query(sql, [access_code]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'No record found for this code' });
    }
  } catch (err) {
    console.error('Error fetching missing person by access code:', err);
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
