require('dotenv').config();
const express = require('express');
const db = require('./config/db');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Test route
app.get('/', (req, res) => {
    res.send("API working");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});