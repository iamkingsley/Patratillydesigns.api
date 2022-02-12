import { PRODUCT } from './../../common/constants';
import mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  id: String,
  name: String,
  slug: String,
  parent: Number,
  details: String,
  image: {
    type: mongoose.Types.ObjectId,
    ref: 'ATTACHMENT'
  },
  icon: String,
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'TYPE'
  },
  products: [{
    type: mongoose.Types.ObjectId,
    ref: PRODUCT
  }],
  created_at: Date,
  updated_at: Date,
})
  