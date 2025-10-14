// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI } = require('./mongo-config'); // MongoDB URI from config
const appointmentRoutes = require('./routes/appointments'); // Appointment route

const app = express();

// Enable CORS for frontend access
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Sample doctor route
app.get('/api/doctors', (req, res) => {
  res.json([
    { id: 1, name: "Dr. Ranjan Pathak", specialization: "Cardiology" },
    { id: 2, name: "Dr. Ansh Pathak", specialization: "Pediatrics" }
  ]);
});

// Appointment route
app.use('/api/appointments', appointmentRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hospital Management System Backend');
});

// Start server and bind to 0.0.0.0 for external access
app.listen(3001, '0.0.0.0', () => {
  console.log('Server running on port 3001');
});
