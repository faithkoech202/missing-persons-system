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
  const access_code = uuidv4().slice(0, 8);

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

// Search for missing persons by full name
router.get('/search', (req, res) => {
  const searchTerm = req.query.query;

  if (!searchTerm) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  const sql = 'SELECT * FROM missing_persons WHERE LOWER(full_name) LIKE ?';
  db.query(sql, [`%${searchTerm.toLowerCase()}%`], (err, results) => {
    if (err) {
      console.error('Search error:', err);
      // Send error details for debugging (remove in production)
      return res.status(500).json({ message: 'Server error', error: err });
    }

    res.json(results);
  });
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

router.get('/public', (req, res) => {
  const sql = "SELECT * FROM missing_persons WHERE reporter_type = 'public'";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(results);
  });
});

module.exports = router;
