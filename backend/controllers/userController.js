const User = require('../models/User');

// @desc    Update user profile (Exhibitor/Attendee)
// @route   PUT /api/users/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.companyName = req.body.companyName || user.companyName;
    user.companyDescription = req.body.companyDescription || user.companyDescription;
    user.logoUrl = req.body.logoUrl || user.logoUrl;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get pending exhibitors
// @route   GET /api/users/exhibitors/pending
// @access  Admin only
const getPendingExhibitors = async (req, res) => {
  try {
    const exhibitors = await User.find({ role: 'exhibitor', isApproved: false }).select('-password');
    res.json(exhibitors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Approve an exhibitor
// @route   PUT /api/users/exhibitors/:id/approve
// @access  Admin only
const approveExhibitor = async (req, res) => {
  try {
    const exhibitor = await User.findById(req.params.id);
    if (!exhibitor || exhibitor.role !== 'exhibitor') {
      return res.status(404).json({ message: 'Exhibitor not found' });
    }

    exhibitor.isApproved = true;
    await exhibitor.save();
    res.json({ message: 'Exhibitor approved', exhibitor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Toggle a bookmark (Add/Remove)
// @route   PUT /api/users/bookmarks/:sessionId
// @access  Attendee only
const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { sessionId } = req.params;

    if (user.bookmarks.includes(sessionId)) {
      user.bookmarks = user.bookmarks.filter(id => id !== sessionId);
    } else {
      user.bookmarks.push(sessionId);
    }

    await user.save();
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { updateProfile, getPendingExhibitors, approveExhibitor, toggleBookmark };