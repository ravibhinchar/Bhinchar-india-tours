const Tour = require('../models/tourModel');

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
const getTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
const getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (tour) {
            res.status(200).json(tour);
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a tour (Admin only - simplification)
// @route   POST /api/tours
// @access  Public (for now, to seed data easily)
const createTour = async (req, res) => {
    try {
        const tour = await Tour.create(req.body);
        res.status(201).json(tour);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getTours,
    getTourById,
    createTour,
};
