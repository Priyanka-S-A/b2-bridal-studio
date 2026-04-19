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
    date: String, // for service booking
    time: String  // for service booking
  }
});

module.exports = mongoose.model('Bill', billSchema);
