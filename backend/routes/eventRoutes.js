const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

// Import your custom middleware
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes for attendees to browse
router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected routes strictly for Admins
router.post('/', protect, authorizeRoles('admin'), createEvent);
router.put('/:id', protect, authorizeRoles('admin'), updateEvent);
router.delete('/:id', protect, authorizeRoles('admin'), deleteEvent);

module.exports = router;