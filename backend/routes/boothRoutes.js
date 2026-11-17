const express = require('express');
const router = express.Router();
const { getBooths, createBooth, bookBooth } = require('../controllers/boothController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Get floor plan data
router.get('/:eventId', getBooths);

// Admin route to generate booths
router.post('/', protect, authorizeRoles('admin'), createBooth);

// Exhibitor route to reserve a spot
router.put('/:id/book', protect, authorizeRoles('exhibitor'), bookBooth);

module.exports = router;