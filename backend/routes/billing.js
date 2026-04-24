const express = require('express');
const Bill = require('../models/Bill');
const Revenue = require('../models/Revenue');
const { verifyToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// ─── GET single bill by ID (Public — for BillView page) ────────────────────
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET all bills (Admin / Owner) ─────────────────────────────────────────
router.get('/', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST — Create online bill (called by booking accept flow) ──────────────
// NOTE: booking accept already calls this via direct model usage in bookings.js.
// Keeping this endpoint available for any direct usage.
router.post('/', async (req, res) => {
  try {
    const newBill = new Bill({ ...req.body, source: 'online' });
    await newBill.save();

    // Auto-insert into Revenue
    await Revenue.create({
      date: newBill.date,
      customer: newBill.customerDetails?.name || 'Customer',
      mode: newBill.mode || 'UPI',
      total: newBill.total,
      source: 'online',
      billId: newBill._id,
      branch: newBill.branch || ''
    });

    res.status(201).json(newBill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─── POST /offline — Create offline bill + Revenue (Admin/Staff) ─────────────
router.post('/offline', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    const { items, total, mode, customer } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'At least one item is required' });
    }
    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Total must be greater than 0' });
    }

    // Create the bill
    const bill = new Bill({
      type: 'mixed',
      items,
      subtotal: total,
      gst: 0,
      total,
      mode: mode || 'Offline',
      source: 'offline',
      customer: customer || 'Walk-in',
      customerDetails: { name: customer || 'Walk-in' }
    });
    await bill.save();

    // Immediately insert into unified Revenue collection
    await Revenue.create({
      date: bill.date,
      customer: customer || 'Walk-in',
      mode: mode || 'Offline',
      total,
      source: 'offline',
      billId: bill._id,
      branch: ''
    });

    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
