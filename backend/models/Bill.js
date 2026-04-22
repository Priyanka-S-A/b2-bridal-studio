const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  type: { type: String, enum: ['service', 'product', 'course'], required: true },
  items: [{ 
    name: String, 
    price: Number, 
    quantity: { type: Number, default: 1 } 
  }],
  subtotal: { type: Number, required: true },
  gst: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  customerDetails: {
    name: String,
    phone: String,
    date: String,
    time: String
  },
  // New fields for booking pipeline
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  branch: { type: String },
  mode: { type: String, default: 'UPI' }
});

module.exports = mongoose.model('Bill', billSchema);
