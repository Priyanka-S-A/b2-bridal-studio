  const express = require('express');
  const Product = require('../models/Product');
  const { verifyToken, verifyRole } = require('../middleware/auth');

  const router = express.Router();

  // Get all products (Public)
  router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Add a product (Admin/Owner)
  router.post('/', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete a product (Admin/Owner)
  router.delete('/:id', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update a product (Admin/Owner)
  router.put('/:id', verifyToken, verifyRole(['staff', 'owner']), async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

  module.exports = router;
