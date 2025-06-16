require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const missingPersonsRoutes = require('./routes/missingPersons');
const unidentifiedBodiesRoutes = require('./routes/unidentifiedBodies'); 
const matchRoutes = require('./routes/match');
const familyAccessRoutes = require('./routes/familyAccess');

// Use routes
app.use('/api/missing-persons', missingPersonsRoutes);
app.use('/api/unidentified-bodies', unidentifiedBodiesRoutes);  
app.use('/api/match', matchRoutes);
app.use('/api/unidentified-bodies', require('./routes/unidentifiedBodies'));
app.use('/api/family-access', familyAccessRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
