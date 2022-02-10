import mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  id: String,
  name: String,
  slug: String,
  parent: Number,
  details: String,
  image: { type: mongoose.Types.ObjectId, ref: 'AttachmentSchema' },
  icon: String,
  type: { type: mongoose.Types.ObjectId, ref: 'TypeSchema' },
  products: [{ type: mongoose.Types.ObjectId, ref: 'ProductSchema' }],
  created_at: Date,
  updated_at: Date,
})
  