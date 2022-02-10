import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  id: String,
  created_at: Date,
  updated_at: Date,
  name: String,
  slug: String,
  parent: {
    type: mongoose.Types.ObjectId,
    ref: 'CategorySchema',
    required: false
  },
  children: [{
    type: mongoose.Types.ObjectId,
    ref: 'CategorySchema'
  }],
  details: String,
  image: {
    type: mongoose.Types.ObjectId,
    ref: 'AttachmentSchema',
    required: false
  },
  icon: String,
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'TypeSchema'
  },
  products: [{
    type: mongoose.Types.ObjectId,
    ref: 'ProductSchema',
    required: false
  }],
});
