import mongoose from 'mongoose';
import { USER } from 'src/common/constants';

export const SocialSchema = new mongoose.Schema({
  type: String,
  link: String
})
export const ProfileSchema = new mongoose.Schema({
  avatar: {
    type: mongoose.Types.ObjectId,
    ref: 'ATTACHMENT',
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  socials: {
    type: [SocialSchema],
    required: false
  },
  contact: {
    type: String,
    required: false
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: USER,
    required: false
  }
})
