import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  small_description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['polos', 'shirts', 'oversized', 'shorts', 'sneakers', 'bottoms']
  },
  image_main: {
    type: String,
    required: true
  },
  'image-2': String,
  'image-3': String,
  'image-4': String,
  sizes: [{
    type: String
  }],
  material: {
    type: String,
    required: true
  },
  fit: {
    type: String,
    required: true
  },
  care: {
    type: String,
    required: true
  },
  key_feature: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  badge: {
    type: String,
    enum: ['NEW', 'TRENDING', 'LIMITED', '']
  }
}, {
  timestamps: true
});

// Index for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
