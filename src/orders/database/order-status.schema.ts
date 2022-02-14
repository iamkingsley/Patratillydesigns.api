import mongoose from "mongoose";

export const OrderStatusSchema = new mongoose.Schema({
    id: String,
    created_at: Date,
    updated_at: Date,
    name: String,
    color: String,
    serial: String,
  })