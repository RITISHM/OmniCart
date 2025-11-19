import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    let products = Product.find(query);

    // Sorting
    if (sort === 'price-low') {
      products = products.sort({ price: 1 });
    } else if (sort === 'price-high') {
      products = products.sort({ price: -1 });
    } else if (sort === 'rating') {
      products = products.sort({ rating: -1 });
    } else {
      products = products.sort({ featured: -1, rating: -1 });
    }

    const result = await products;
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
