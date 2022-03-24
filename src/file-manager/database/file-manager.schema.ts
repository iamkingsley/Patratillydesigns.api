import mongoose from 'mongoose';

export const FileManagerSchema = new mongoose.Schema({
  id: String,
  asset_id: String,
  original: String,
  thumbnail: String,
  created_at: Date,
  updated_at: Date,

})
