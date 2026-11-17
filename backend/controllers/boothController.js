const Booth = require('../models/Booth');

// @desc    Get all booths for a specific event's floor plan
// @route   GET /api/booths/:eventId
// @access  Public
const getBooths = async (req, res) => {
  try {
    // Fetches the booths and attaches the exhibitor's company details for the map markers
    const booths = await Booth.find({ event: req.params.eventId })
      .populate('exhibitor', 'companyName logoUrl');
    res.status(200).json(booths);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new booth (Admin drawing the floor plan)
// @route   POST /api/booths
// @access  Private (Admin only)
const createBooth = async (req, res) => {
  try {
    const { event, boothNumber, price, coordinates } = req.body;
    
    const booth = await Booth.create({
      event,
      boothNumber,
      price,
      coordinates
    });

    res.status(201).json(booth);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Book a booth 
// @route   PUT /api/booths/:id/book
// @access  Private (Exhibitor only)
const bookBooth = async (req, res) => {
  try {
    const booth = await Booth.findById(req.params.id);

    if (!booth) {
      return res.status(404).json({ message: 'Booth not found' });
    }

    if (booth.status !== 'available') {
      return res.status(400).json({ message: 'This booth is already reserved' });
    }

    // Update status and assign the logged-in exhibitor
    booth.status = 'reserved';
    booth.exhibitor = req.user._id;
    await booth.save();

    // Broadcast the updated booth data to all connected frontends via Socket.io
    req.io.emit('boothUpdated', booth);

    res.status(200).json(booth);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getBooths, createBooth, bookBooth };