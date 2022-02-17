import mongoose from 'mongoose';
import { OrderSchema } from './../../orders/database/orders.schema';
import { AttachmentSchema } from 'src/common/schema/attachment.schema';

export const CouponSchema = new mongoose.Schema({
  id: String,
  created_at: Date,
  updated_at: Date,
  code: String,
  description: { type: String, required: false },
  orders: { type: [OrderSchema], required: false },
  type: String, // CouponType,
  image: AttachmentSchema,
  is_valid: Boolean,
  amount: Number,
  active_from: String,
  expire_at: String,
})
