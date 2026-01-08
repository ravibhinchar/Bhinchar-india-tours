const express = require('express');
const router = express.Router();
const Inquiry = require('../models/inquiryModel');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public (or Private if we enforce login)
router.post('/', async (req, res) => {
    try {
        const { destination, people, checkin, checkout, user } = req.body;

        const inquiry = await Inquiry.create({
            destination,
            people,
            checkin,
            checkout,
            user // ID if available
        });

        res.status(201).json(inquiry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all inquiries (Admin)
// @route   GET /api/inquiries
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const inquiries = await Inquiry.find({})
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
