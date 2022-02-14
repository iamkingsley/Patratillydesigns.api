import mongoose from 'mongoose';

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

export const AddressSchema = new mongoose.Schema({
  title: String,
  default: Boolean,
  address: new mongoose.Schema({
    street_address: String,
    country: String,
    city: String,
    state: String,
    zip: String,
  }),
  type: String,
  // type:  { 
  //   type: String,
  //   enum: AddressType,
  //   default: AddressType.BILLING
  // },
  customer: { type: mongoose.Types.ObjectId, ref: 'USER' },
})
