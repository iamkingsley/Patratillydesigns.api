import { PERMISSIONS } from './../../common/enums';
import mongoose from 'mongoose';
import { ADDRESS, ORDER } from 'src/common/constants';
// import { AddressSchema } from 'src/addresses/database/address.schema';
import { ShopSchema } from 'src/shops/database/shops.schema';
import { ProfileSchema } from './profile.schema';

export const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  permissions: [{
    type: String,
    default: [PERMISSIONS.CUSTOMER]
  }],
  shop_id: {
    type: Number,
    required: false
  },
  profile: {
    type: ProfileSchema,
    required: false
  },
  // shops: [{
  //   type: mongoose.Types.ObjectId,
  //   ref: 'SHOP',
  //   rquired: false
  // }],
  // managed_shop: { type: ShopSchema, required: false },
  is_active: {
    type: Boolean,
    default: true,
    required: false
  },
  address: [{ 
    type: mongoose.Types.ObjectId,
    ref: ADDRESS,
    required: false
  }],
  orders: [{
    type:  mongoose.Types.ObjectId,
    ref: ORDER,
    required: false
  }],
  measurement: Object,
  created_at: Date,
  updated_at: Date,
})
