const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  theme: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links this event to a specific admin User
    required: true
  },
  // Embedded schedule documents
  schedule: [{
    sessionTitle: String,
    speakerName: String,
    startTime: Date,
    endTime: Date,
    locationDetails: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);