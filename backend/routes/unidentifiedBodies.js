const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../config/db');

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST route to add an unidentified body
router.post('/', upload.single('photo'), async (req, res) => {
  const { gender, age_estimate, found_location, date_found, physical_description } = req.body;
  const photo_path = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO unidentified_bodies 
    (gender, age_estimate, found_location, date_found, physical_description, photo) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  await db.query(sql, [gender, age_estimate, found_location, date_found, physical_description, photo_path]);

  res.status(201).json({ message: 'Unidentified body report submitted' });
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
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM unidentified_bodies WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Unidentified body not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error retrieving unidentified body:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/search', async (req, res) => {
  const { date_found, found_location, gender } = req.query;

  let sql = `SELECT * FROM unidentified_bodies WHERE 1=1`;
  const params = [];

  if (date_found) {
    sql += ` AND date_found = ?`;
    params.push(date_found);
  }
  if (found_location) {
    sql += ` AND found_location LIKE ?`;
    params.push(`%${found_location}%`);
  }
  if (gender) {
    sql += ` AND gender = ?`;
    params.push(gender);
  }

  try {
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while searching.' });
  }
});

module.exports = router;
