const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;


  console.log('Login attempt:', username, password);

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

  try {
    const [results] = await db.query(sql, [username, password]);

console.log('Query result:', results);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ token, role: user.role });

  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
