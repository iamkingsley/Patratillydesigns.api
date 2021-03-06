import mongoose from 'mongoose';
import { UserSchema } from 'src/users/database/users.schema';

// export const PaymentInfoSchema = new mongoose.Schema({
//   account: String,
//   name: String,
//   email: String,
//   bank: String,
// })
// export const BalanceSchema = new mongoose.Schema({
//   id: Number,
//   admin_commission_rate: Number,
//   shop: { type: Object }, // ShopSchema,
//   total_earnings: Number,
//   withdrawn_amount: Number,
//   current_balance: Number,
//   payment_info: { type: PaymentInfoSchema },
// })


// const ShopSocialsSchema = new mongoose.Schema({
//   icon: String,
//   url: String,
// })

// export const ShopSettingsSchema = new mongoose.Schema({
//   socials: [ShopSocialsSchema],
//   contact: String,
//   location: { type: Object }, // Location,
//   website: String,
// })

export const ShopSchema = new mongoose.Schema({
  owner_id: Number,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'UserSchema'
  },
  staffs: [{
    type: mongoose.Types.ObjectId,
    ref: 'UserSchema',
    required: false
  }],
  is_active: Boolean,
  orders_count: Number,
  products_count: Number,
  balance: {
    type: mongoose.Types.ObjectId,
    required: false
  }, // BalanceSchema
  name: String,
  slug: String,
  description: { type: String, required: false },
  cover_image: {
    type: mongoose.Types.ObjectId,
    ref: 'AttachmentSchema'
  },
  logo: {
    type: mongoose.Types.ObjectId,
    ref: 'AttachmentSchema',
    required: false
  },
  address: {
    type: mongoose.Types.ObjectId,
  }, // UserAddressSchema,
  settings: {
    type: mongoose.Types.ObjectId,
    required: false
  }, // ShopSettingsSchema
})
