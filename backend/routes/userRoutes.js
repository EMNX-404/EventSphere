const express = require('express');
const router = express.Router();
const { updateProfile, getPendingExhibitors, approveExhibitor, toggleBookmark } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.put('/profile', protect, updateProfile);
router.get('/exhibitors/pending', protect, authorizeRoles('admin'), getPendingExhibitors);
router.put('/exhibitors/:id/approve', protect, authorizeRoles('admin'), approveExhibitor);
router.put('/bookmarks/:sessionId', protect, authorizeRoles('attendee'), toggleBookmark);

module.exports = router;