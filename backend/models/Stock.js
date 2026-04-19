const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  lastRestocked: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stock', stockSchema);
