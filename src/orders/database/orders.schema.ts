import mongoose from 'mongoose';
import { UserAddressSchema } from 'src/addresses/database/address.schema';

export const OrderSchema = new mongoose.Schema({
  tracking_number: String,
  customer_id: Number,
  customer_contact: String,
  customer: { type: mongoose.Types.ObjectId, ref: 'UserSchema' },
  parent_order: { type: mongoose.Types.ObjectId, required: false },
  children: [{ type: mongoose.Types.ObjectId, ref: 'OrderSchema' }],
  status: String, // OrderStatus,
  amount: Number,
  sales_tax: Number,
  total: Number,
  paid_total: Number,
  payment_id: { type: String, required: false },
  payment_gateway: String, // PaymentGatewayType,
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: 'CouponSchema',
    required: false
  },
  shop: {
    type: mongoose.Types.ObjectId,
    ref: 'ShopSchema'
  },
  discount: { type: Number, required: false },
  delivery_fee: Number,
  delivery_time: String,
  products: [{
    type: mongoose.Types.ObjectId,
    ref: 'ProductSchema'
  }],
  billing_address: { type: mongoose.Types.ObjectId },
  shipping_address: { type: mongoose.Types.ObjectId },
})