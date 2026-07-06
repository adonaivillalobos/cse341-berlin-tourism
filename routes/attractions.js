const express = require('express');
const router = express.Router();
const { getAllAttractions, getAttractionById, createAttraction, updateAttraction, deleteAttraction } = require('../controllers/attractions');

router.get('/', getAllAttractions);
router.get('/:id', getAttractionById);
router.post('/', createAttraction);
router.put('/:id', updateAttraction);
router.delete('/:id', deleteAttraction);

module.exports = router;