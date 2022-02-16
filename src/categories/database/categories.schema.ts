import { CATEGORY, ATTACHMENT } from './../../common/constants';
import { PRODUCT } from 'src/common/constants';
import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  id: String,
  created_at: Date,
  updated_at: Date,
  name: String,
  slug: String,
  parent_id: String, // uuid
  parent: {
    type: mongoose.Types.ObjectId,
    ref: CATEGORY,
    required: false
  },
  children: [{
    type: mongoose.Types.ObjectId,
    ref: CATEGORY
  }],
  details: String,
  image: {
    type: mongoose.Types.ObjectId,
    ref: ATTACHMENT,
    required: false
  },
  icon: String,
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'TypeSchema'
  },
  products: [{
    type: mongoose.Types.ObjectId,
    ref: PRODUCT,
    required: false
  }],
});
