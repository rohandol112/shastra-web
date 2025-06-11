// Express backend for Contact Us form with MongoDB
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('./db'); // Ensure DB connection is established

const contactSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Phone: String,
  HackerrankId: String,
  Message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

router.post('/contact', async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone, HackerrankId, Message } = req.body;
    if (!FirstName || !LastName || !Email || !Message) {
      return res.status(400).json({ error: 'First name, last name, email, and message are required.' });
    }
    const contact = new Contact({ FirstName, LastName, Email, Phone, HackerrankId, Message });
    await contact.save();
    res.json({ success: true, message: 'Message received!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router; 