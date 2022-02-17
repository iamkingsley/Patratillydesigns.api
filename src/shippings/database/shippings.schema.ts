import mongoose from 'mongoose';
import { ShippingType } from '../entities/shipping.entity';

export const ShippingSchema = new mongoose.Schema({
  id: String,
  created_at: Date,
  updated_at: Date,
  name: String,
  amount: String,
  is_global: Boolean,
  type: {
      type: String,
      enum: ShippingType,
      default: ShippingType.FIXED
  },
})
