const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const getAllAttractions = async (req, res) => {
  try {
    const db = getDB();
    const attractions = await db.collection('attractions').find({}).toArray();
    res.json(attractions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve attractions' });
  }
};

const getAttractionById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid attraction ID' });
    }
    const db = getDB();
    const attraction = await db.collection('attractions').findOne({ _id: new ObjectId(req.params.id) });
    if (!attraction) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    res.json(attraction);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve attraction' });
  }
};

const createAttraction = async (req, res) => {
  try {
    const { name, category, description, address, neighborhood, openingHours, entryFee, website, rating } = req.body;
    if (!name || !category || !description || !address || !neighborhood || !openingHours || !entryFee || !website || !rating) {
      return res.status(400).json({ error: 'All fields are required: name, category, description, address, neighborhood, openingHours, entryFee, website, rating' });
    }
    const db = getDB();
    const attraction = { name, category, description, address, neighborhood, openingHours, entryFee, website, rating };
    const result = await db.collection('attractions').insertOne(attraction);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create attraction' });
  }
};

const updateAttraction = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid attraction ID' });
    }
    const { name, category, description, address, neighborhood, openingHours, entryFee, website, rating } = req.body;
    if (!name || !category || !description || !address || !neighborhood || !openingHours || !entryFee || !website || !rating) {
      return res.status(400).json({ error: 'All fields are required: name, category, description, address, neighborhood, openingHours, entryFee, website, rating' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const attraction = { name, category, description, address, neighborhood, openingHours, entryFee, website, rating };
    const result = await db.collection('attractions').replaceOne({ _id: id }, attraction);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    res.json({ message: 'Attraction updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update attraction' });
  }
};

const deleteAttraction = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid attraction ID' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('attractions').deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    res.json({ message: 'Attraction deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete attraction' });
  }
};

module.exports = { getAllAttractions, getAttractionById, createAttraction, updateAttraction, deleteAttraction };