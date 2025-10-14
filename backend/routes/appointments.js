const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const Appointment = require('../model/Appointment'); // Correct path

// Gmail SMTP setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',         // ← Replace with your Gmail ID
    pass: 'your-app-password'             // ← Replace with Gmail App Password
  }
});

// Function to send email
const sendEmail = async (email, reference) => {
  try {
    await transporter.sendMail({
      to: email,
      subject: 'Appointment Confirmation',
      text: `Your appointment is confirmed. Reference: ${reference}`
    });
  } catch (err) {
    console.error('Email sending failed:', err);
  }
};

// Twilio setup
const client = twilio('TWILIO_SID', 'TWILIO_AUTH_TOKEN'); // ← Replace with Twilio credentials

// Function to send SMS
const sendSMS = async (phone, reference) => {
  try {
    await client.messages.create({
      body: `Appointment confirmed. Ref: ${reference}`,
      from: '+1234567890', // ← Replace with your Twilio number
      to: phone
    });
  } catch (err) {
    console.error('SMS sending failed:', err);
  }
};

// POST route to create appointment
router.post('/', async (req, res) => {
  try {
    const reference = uuidv4(); // Unique reference number
    const appointment = new Appointment({ ...req.body, reference });

    await appointment.save(); // Save to MongoDB

    // Send notifications
    await Promise.all([
      sendEmail(req.body.email, reference),
      sendSMS(req.body.phone, reference)
    ]);

    res.json({ success: true, reference });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
