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
