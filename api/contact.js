// api/contact.js
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { sendContactEmail } = require('./utils/mailer');
require('./db'); // Ensure DB connection is established

const contactSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long']
  },
  LastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long']
  },
  Email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  Phone: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  HackerrankId: {
    type: String,
    trim: true
  },
  Message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// Validation middleware
const validateContact = [
  body('FirstName').trim().isLength({ min: 2 }).escape(),
  body('LastName').trim().isLength({ min: 2 }).escape(),
  body('Email').trim().isEmail().normalizeEmail(),
  body('Phone').optional().trim().matches(/^[0-9]{10}$/),
  body('HackerrankId').optional().trim().escape(),
  body('Message').trim().isLength({ min: 10 }).escape()
];

// GET route for testing
router.get('/', (req, res) => {
  res.json({ 
    message: 'Contact API is working!',
    endpoint: '/api/contact',
    methods: ['GET', 'POST']
  });
});

// POST route for contact form
router.post('/', validateContact, async (req, res) => {
  try {
    console.log('Contact form submission received:', req.body);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { FirstName, LastName, Email, Phone, HackerrankId, Message } = req.body;
    
    // Create and save contact
    const contact = new Contact({
      FirstName,
      LastName,
      Email,
      Phone,
      HackerrankId,
      Message
    });

    await contact.save();
    console.log('Contact saved successfully:', contact._id);

    // Send emails
    try {
      await sendContactEmail(contact);
      console.log('Contact email sent successfully');
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({ 
      success: true, 
      message: 'Message received successfully!',
      data: {
        id: contact._id,
        timestamp: contact.createdAt
      }
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

module.exports = router;