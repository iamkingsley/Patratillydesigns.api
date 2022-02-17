import { ADDRESS, ORDER, PRODUCT, USER } from 'src/common/constants';
import mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  id: String,
  tracking_number: String,
  customer_id: Number,
  customer_contact: String,
  customer: {
    type: mongoose.Types.ObjectId,
    ref: USER
  },
  parent_order: {
    type: mongoose.Types.ObjectId,
    required: false
  },
  children: [{
    type: mongoose.Types.ObjectId,
    ref: ORDER
  }],
  status: String, // OrderStatus,
  amount: Number,
  sales_tax: Number,
  total: Number,
  paid_total: Number,
  payment_id: { type: String, required: false },
  payment_gateway: String, // PaymentGatewayType,
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: 'COUPON',
    required: false
  },
  shop: {
    type: mongoose.Types.ObjectId,
    ref: 'SHOP'
  },
  discount: { type: Number, required: false },
  delivery_fee: Number,
  delivery_time: String,
  // products: [{
  //   type: mongoose.Types.ObjectId,
  //   ref: PRODUCT
  // }],
  products: [],
  billing_address: Object,
  // billing_address: { 
  //   type: mongoose.Types.ObjectId,
  //   ref: ADDRESS
  // },
  shipping_address: Object,
  // shipping_address: {
  //   type: mongoose.Types.ObjectId,
  //   ref: ADDRESS
  // },
  created_at: String,
  updated_at: String
})