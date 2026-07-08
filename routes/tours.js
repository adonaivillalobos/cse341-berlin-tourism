const express = require('express');
const router = express.Router();
const { getAllTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tours');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', getAllTours);
router.get('/:id', getTourById);
router.post('/', isAuthenticated, createTour);
router.put('/:id', isAuthenticated, updateTour);
router.delete('/:id', isAuthenticated, deleteTour);

module.exports = router;