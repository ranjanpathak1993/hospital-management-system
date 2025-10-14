const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  doctor: String,
  date: String,
  time: String,
  reference: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
