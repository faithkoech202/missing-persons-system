const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const crypto = require('crypto');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Helper
function generateAccessCode() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

// POST /api/public-reports
router.post('/', upload.single('photo'), (req, res) => {
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

  const photo = req.file ? req.file.filename : null;
  const access_code = generateAccessCode();

  const insertPersonSQL = `
    INSERT INTO missing_persons (
      full_name, date_of_birth, gender, last_seen_location, date_last_seen,
      reporter_name, reporter_phone, distinguishing_marks, medical_conditions,
      social_media, description, photo, access_code, reported_by, visibility
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'public', 'public')
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
    photo,
    access_code
  ];

  db.query(insertPersonSQL, values, (err, result) => {
    if (err) {
      console.error('Error saving report:', err);
      // Send error details for debugging (remove in production)
      return res.status(500).json({ message: 'Failed to submit report', error: err });
    }

    const notificationMsg = `New public missing person report: ${full_name}`;
    const insertNotificationSQL = `
      INSERT INTO notifications (type, message, target_role)
      VALUES ('missing_person', ?, 'police')
    `;

    db.query(insertNotificationSQL, [notificationMsg], (notifyErr, notifyResult) => {
      if (notifyErr) {
        console.error('Error saving notification:', notifyErr);
        // Send error details for debugging (remove in production)
        return res.status(500).json({ message: 'Report saved but failed to notify police', error: notifyErr });
      }

      return res.status(201).json({
        message: 'Report submitted and police notified',
        access_code: access_code
      });
    });
  });
});

// Add this at the top or bottom for quick backend testing
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;

