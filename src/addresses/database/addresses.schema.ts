import mongoose from 'mongoose';
import { AddressType } from 'src/common/enums';

export const AddressSchema = new mongoose.Schema({
  id: String,
  title: String,
  default: Boolean,
  address: new mongoose.Schema({
    street_address: String,
    country: String,
    city: String,
    state: String,
    zip: String,
  }),
  type:  { 
    type: String,
    enum: AddressType,
    default: AddressType.BILLING
  },
  customer: { type: mongoose.Types.ObjectId, ref: 'USER' },
  customer_id: String,
})
