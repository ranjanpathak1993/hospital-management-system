// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// ✅ Enable CORS for frontend access
app.use(cors());

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect('mongodb://mongo:27017/hospitaldb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ✅ Sample doctor route
app.get('/api/doctors', (req, res) => {
  res.json([
    { id: 1, name: "Dr. Ranjan Pathak", specialization: "Cardiology" },
    { id: 2, name: "Dr. Ansh Pathak", specialization: "Pediatrics" }
  ]);
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hospital Management System Backend');
});

// ✅ Start server and bind to 0.0.0.0 for external access
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI } = require('./mongo-config'); // ← yeh import ho raha hai

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect using config
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);
