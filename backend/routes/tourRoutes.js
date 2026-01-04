const express = require('express');
const router = express.Router();
const { getTours, getTourById, createTour } = require('../controllers/tourController');

router.get('/', getTours);
router.get('/:id', getTourById);
router.post('/', createTour);

module.exports = router;
