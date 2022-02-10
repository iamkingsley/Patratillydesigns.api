import mongoose from 'mongoose';
import { UserSchema } from 'src/users/database/users.schema';

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}
// not used
export const UserAddressSchema = new mongoose.Schema({
  street_address: String,
  country: String,
  city: String,
  state: String,
  zip: String,
})

export const AddressSchema = new mongoose.Schema({
  title: String,
  default: Boolean,
  address: { type: mongoose.Types.ObjectId },
  type: String,
  // type:  { 
  //   type: String,
  //   enum: AddressType,
  //   default: AddressType.BILLING
  // },
  customer: { type: mongoose.Types.ObjectId, ref: 'UserSchema' },
})
