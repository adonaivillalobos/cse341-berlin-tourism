const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const getAllTours = async (req, res) => {
  try {
    const db = getDB();
    const tours = await db.collection('tours').find({}).toArray();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tours' });
  }
};

const getTourById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid tour ID' });
    }
    const db = getDB();
    const tour = await db.collection('tours').findOne({ _id: new ObjectId(req.params.id) });
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tour' });
  }
};

const createTour = async (req, res) => {
  try {
    const { name, description, duration, price, language, maxGroupSize, meetingPoint, attractionIds } = req.body;
    if (!name || !description || !duration || !price || !language || !maxGroupSize || !meetingPoint) {
      return res.status(400).json({ error: 'All fields are required: name, description, duration, price, language, maxGroupSize, meetingPoint' });
    }
    const db = getDB();
    const tour = { name, description, duration, price, language, maxGroupSize, meetingPoint, attractionIds };
    const result = await db.collection('tours').insertOne(tour);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create tour' });
  }
};

const updateTour = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid tour ID' });
    }
    const { name, description, duration, price, language, maxGroupSize, meetingPoint, attractionIds } = req.body;
    if (!name || !description || !duration || !price || !language || !maxGroupSize || !meetingPoint) {
      return res.status(400).json({ error: 'All fields are required: name, description, duration, price, language, maxGroupSize, meetingPoint' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const tour = { name, description, duration, price, language, maxGroupSize, meetingPoint, attractionIds };
    const result = await db.collection('tours').replaceOne({ _id: id }, tour);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.json({ message: 'Tour updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update tour' });
  }
};

const deleteTour = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid tour ID' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('tours').deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete tour' });
  }
};

module.exports = { getAllTours, getTourById, createTour, updateTour, deleteTour };