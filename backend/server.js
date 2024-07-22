// backend/index.js

const express = require('express');
const cors = require('cors');
const pool = require('./db');
const customersRoutes = require('./routes/customersRoutes');
const salesRoutes = require('./routes/salesRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect routes
app.use('/api', customersRoutes);
app.use('/api', salesRoutes);

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Unable to connect to the database:', err);
  } else {
    console.log('Database connected');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
