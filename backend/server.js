import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { mongoURI } from './mongo-config.js';
import appointmentRoutes from './routes/appointments.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/api/doctors', (req, res) => {
  res.json([
    { id: 1, name: "Dr. Ranjan Pathak", specialization: "Cardiology" },
    { id: 2, name: "Dr. Ansh Pathak", specialization: "Pediatrics" }
  ]);
});

app.use('/api/appointments', appointmentRoutes);

app.get('/', (req, res) => {
  res.send('Hospital Management System Backend');
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Server running on port 3001');
});
