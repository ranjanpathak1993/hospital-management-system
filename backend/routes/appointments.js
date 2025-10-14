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
const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Gmail SMTP setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',         // ← apna Gmail ID
    pass: 'your-app-password'             // ← Gmail App Password (not regular password)
  }
});

const sendEmail = async (email, reference) => {
  await transporter.sendMail({
    to: email,
    subject: 'Appointment Confirmation',
    text: `Your appointment is confirmed. Reference: ${reference}`
  });
};

// Twilio setup
const client = twilio('TWILIO_SID', 'TWILIO_AUTH_TOKEN'); // ← apna Twilio credentials

const sendSMS = async (phone, reference) => {
  await client.messages.create({
    body: `Appointment confirmed. Ref: ${reference}`,
    from: '+1234567890', // ← apna Twilio number
    to: phone
  });
};

module.exports = { sendEmail, sendSMS };
