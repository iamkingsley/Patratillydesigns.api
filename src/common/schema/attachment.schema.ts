import mongoose from 'mongoose';

export const AttachmentSchema = new mongoose.Schema({
  asset_id: String,
  thumbnail: { type: String, required: false },
  original: String,
  create_at: Date,
})
