const express = require('express');
const Bill = require('../models/Bill');
const { verifyToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// Create a new bill (Public via WhatsApp/Cart logic)
router.post('/', async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bills (Admin/Owner)
router.get('/', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    const bills = await Bill.find().sort({ date: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get revenue stats (Owner only)
router.get('/revenue', verifyToken, verifyRole(['owner']), async (req, res) => {
  try {
    const bills = await Bill.find();
    let totalRevenue = 0;
    const byCategory = { service: 0, product: 0, course: 0 };
    
    bills.forEach(bill => {
      totalRevenue += bill.total;
      if (byCategory[bill.type] !== undefined) {
        byCategory[bill.type] += bill.total;
      }
    });

    res.json({ totalRevenue, byCategory, bills });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
