const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('./db');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true
  },
  criteria: {
    type: String,
    required: [true, 'Event criteria is required'],
    trim: true
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  contestLink: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Event image is required'],
    trim: true
  },
  isPast: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model('Event', eventSchema);

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ startTime: -1 });
    res.json({ data: events });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({
      error: 'Server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get upcoming events
router.get('/events/upcoming', async (req, res) => {
  try {
    const upcomingEvents = await Event.find({
      startTime: { $gte: new Date() },
      isPast: false
    }).sort({ startTime: 1 });
    res.json({ data: upcomingEvents });
  } catch (err) {
    console.error('Error fetching upcoming events:', err);
    res.status(500).json({
      error: 'Server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get past events
router.get('/events/past', async (req, res) => {
  try {
    const pastEvents = await Event.find({
      $or: [
        { startTime: { $lt: new Date() } },
        { isPast: true }
      ]
    }).sort({ startTime: -1 });
    res.json({ data: pastEvents });
  } catch (err) {
    console.error('Error fetching past events:', err);
    res.status(500).json({
      error: 'Server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Create a new event (protected route - should be admin only)
router.post('/events', async (req, res) => {
  try {
    const { name, criteria, startTime, contestLink, image, isPast } = req.body;
    
    const event = new Event({
      name,
      criteria,
      startTime,
      contestLink,
      image,
      isPast
    });

    await event.save();
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({
      error: 'Server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router; 