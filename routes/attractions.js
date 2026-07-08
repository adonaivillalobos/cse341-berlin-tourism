const express = require('express');
const router = express.Router();
const { getAllAttractions, getAttractionById, createAttraction, updateAttraction, deleteAttraction } = require('../controllers/attractions');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', getAllAttractions);
router.get('/:id', getAttractionById);
router.post('/', isAuthenticated, createAttraction);
router.put('/:id', isAuthenticated, updateAttraction);
router.delete('/:id', isAuthenticated, deleteAttraction);

module.exports = router;