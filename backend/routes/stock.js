const express = require('express');
const Stock = require('../models/Stock');
const { verifyToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// Get all stock (Admin/Owner)
router.get('/', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    const stock = await Stock.find();
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add stock item (Admin/Owner)
router.post('/', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    await newStock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update stock item (Admin/Owner)
router.put('/:id', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete stock item (Admin/Owner)
router.delete('/:id', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stock item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
