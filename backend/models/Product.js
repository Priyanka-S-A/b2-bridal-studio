const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: '' },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);