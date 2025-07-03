require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const multer = require('multer'); // Add this line

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be saved to 'uploads/' directory

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
// No need to use upload middleware here; use it in the route handler itself
app.use('/api/public-reports', require('./routes/PublicReports'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
