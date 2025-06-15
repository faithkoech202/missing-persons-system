const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const missingPersonsRoutes = require('./routes/missingPersonsRoutes');
app.use('/api/missing-persons', missingPersonsRoutes);

app.get('/', (req, res) => {
  res.send('Missing Persons System Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

