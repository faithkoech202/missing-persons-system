require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Debug log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/missing-persons', require('./routes/missingPersons'));
app.use('/api/unidentified-bodies', require('./routes/unidentifiedBodies'));
app.use('/api/match', require('./routes/match'));
app.use('/api/family-access', require('./routes/familyAccess'));
app.use('/api', require('./routes/auth'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
