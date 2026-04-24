const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  type: { type: String, enum: ['service', 'product', 'course', 'mixed'], default: 'mixed' },
  items: [{ 
    name: String, 
    price: Number, 
    quantity: { type: Number, default: 1 },
    itemType: { type: String } // 'service' | 'product'
  }],
  subtotal: { type: Number, default: 0 },
  gst: { type: Number, default: 0 },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  customerDetails: {
    name: String,
    phone: String,
    date: String,
    time: String
  },
  // Booking pipeline reference
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  branch: { type: String },
  mode: { type: String, enum: ['online', 'offline'], default: 'offline' },
  // Unified source tracking
  source: { type: String, enum: ['online', 'offline'], default: 'online' },
  customer: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
