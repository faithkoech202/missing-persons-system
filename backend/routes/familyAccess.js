const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:accessCode', (req, res) => {
  const code = req.params.accessCode;
  const sql = 'SELECT * FROM missing_persons WHERE access_code = ?';
  db.query(sql, [code], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(results[0]);
  });
});

module.exports = router;
