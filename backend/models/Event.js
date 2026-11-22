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
  eventType: {
    type: String,
    default: 'Expo'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  attendees: {
    type: Number,
    default: 0
  },
  highlights: {
    type: [String],
    default: []
  },
  exhibitors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
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
    ref: 'User',
    required: true
  },
  schedule: [{
    sessionTitle: String,
    speakerName: String,
    startTime: Date,
    endTime: Date,
    locationDetails: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);