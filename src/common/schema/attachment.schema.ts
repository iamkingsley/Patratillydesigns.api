import mongoose from 'mongoose';

export const AttachmentSchema = new mongoose.Schema({
  thumbnail: { type: String, required: false },
  original: String,
  create_at: Date,
})
