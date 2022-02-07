import mongoose from "mongoose";

export const CoreSchema = new mongoose.Schema({
  id: Number,
  created_at: Date,
  updated_at: Date,
})
