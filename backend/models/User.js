const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Prevents duplicate accounts
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'exhibitor', 'attendee'], // Strictly limits allowed values
    required: true
  },
  // Exhibitor specific fields (optional for attendees/admins)
  companyName: {
    type: String
  },
  companyDescription: {
    type: String
  },
  logoUrl: {
    type: String
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  // Attendee saved session IDs
  bookmarks: {
    type: [String],
    default: []
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);