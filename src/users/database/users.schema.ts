import mongoose from 'mongoose';
import { AddressSchema } from 'src/addresses/database/address.schema';
import { ShopSchema } from 'src/shops/database/shops.schema';
import { ProfileSchema } from './profile.schema';
// import { Order } from 'src/orders/entities/order.entity';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, required: false },
  shop_id: { type: Number, required: false },
  profile: { type: ProfileSchema, required: false },
  shops: { type: [ShopSchema], rquired: false },
  // managed_shop: { type: ShopSchema, required: false },
  is_active: { type: Boolean, default: true, required: false },
  // address: { type: AddressSchema, required: false },
  // orders?: Order[];
})
