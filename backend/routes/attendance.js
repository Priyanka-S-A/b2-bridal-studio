const express = require('express');
const Staff = require('../models/Staff');
const Attendance = require('../models/Attendance');
const { verifyToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// Get all staff (Owner)
router.get('/staff', verifyToken, verifyRole(['owner']), async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add staff (Owner)
router.post('/staff', verifyToken, verifyRole(['owner']), async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mark attendance (Owner)
router.post('/mark', verifyToken, verifyRole(['owner']), async (req, res) => {
  try {
    const { staffId, checkInTime, checkOutTime, date } = req.body;
    let record = await Attendance.findOne({ staffId, date: new Date(date) });
    
    if (record) {
      record.checkInTime = checkInTime || record.checkInTime;
      record.checkOutTime = checkOutTime || record.checkOutTime;
      await record.save();
    } else {
      record = new Attendance({ staffId, date: new Date(date), checkInTime, checkOutTime });
      await record.save();
    }
    
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get attendance (Owner)
router.get('/', verifyToken, verifyRole(['owner']), async (req, res) => {
  try {
    const records = await Attendance.find().populate('staffId');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
