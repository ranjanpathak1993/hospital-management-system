const express = require('express');
const router = express.Router();
const Appointment = require('../model/Appointment'); // correct path
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
  try {
    const reference = uuidv4(); // unique reference number
    const appointment = new Appointment({ ...req.body, reference });
    await appointment.save(); await sendEmail(req.body.email, reference);
await sendSMS(req.body.phone, reference);

    res.json({ success: true, reference });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
const { sendEmail, sendSMS } = require('../utils/notifications');
