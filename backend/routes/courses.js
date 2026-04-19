const express = require('express');
const Course = require('../models/Course');
const { verifyToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// Get all courses (Public)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get courses by category (Public)
router.get('/category/:category', async (req, res) => {
  try {
    // case insensitive search
    const courses = await Course.find({ category: { $regex: new RegExp(`^${req.params.category}$`, 'i') } });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a course (Admin/Owner)
router.post('/', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a course (Admin/Owner)
router.delete('/:id', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a course (Admin/Owner)
router.put('/:id', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
