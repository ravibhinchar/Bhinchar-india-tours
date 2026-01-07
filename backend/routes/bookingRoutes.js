const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const { protect } = require('../middleware/authMiddleware'); // Re-using auth middleware

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, async (req, res) => {
    const { tourTitle, tourId } = req.body;

    if (!tourTitle || !tourId) {
        return res.status(400).json({ message: 'Tour details are required' });
    }

    try {
        const booking = await Booking.create({
            user: req.user._id,
            tourTitle,
            tourId,
            status: 'Pending'
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get logged in user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
router.get('/my-bookings', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
