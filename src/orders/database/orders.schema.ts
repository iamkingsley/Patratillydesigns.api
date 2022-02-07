import mongoose from 'mongoose';
import { UserAddressSchema } from 'src/addresses/database/address.schema';
import { CouponSchema } from 'src/coupons/database/coupons.schema';
import { ShopSchema } from 'src/shops/database/shops.schema';
import { UserSchema } from 'src/users/database/users.schema';

export const OrderSchema = new mongoose.Schema({
  tracking_number: String,
  customer_id: Number,
  customer_contact: String,
  customer: { type: UserSchema }, // UserSchema,
  parent_order: { type: Object, required: false }, // OrderSchema,
  children: { type: [Object] },// [OrderSchema],
  status: String, // OrderStatus,
  amount: Number,
  sales_tax: Number,
  total: Number,
  paid_total: Number,
  payment_id: { type: String, required: false },
  payment_gateway: String, // PaymentGatewayType,
  coupon: { type: CouponSchema, required: false }, // CouponSchema,
  shop: { type: ShopSchema },
  discount: { type: Number, required: false },
  delivery_fee: Number,
  delivery_time: String,
  products: { type: [Object] }, // [ProductSchema],
  billing_address: { type: UserAddressSchema },
  shipping_address: UserAddressSchema,
})