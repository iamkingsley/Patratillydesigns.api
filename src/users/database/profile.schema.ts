import mongoose from 'mongoose';
import { UserSchema } from 'src/users/database/users.schema';
import { AttachmentSchema } from 'src/common/schema/attachment.schema';

export const SocialSchema = new mongoose.Schema({
  type: String,
  link: String
})
export const ProfileSchema = new mongoose.Schema({
  avatar: { type: AttachmentSchema, required: false },
  bio: { type: String, required: false },
  socials: { type: [SocialSchema], required: false },
  contact: { type: String, required: false },
  customer: { type: Object, required: false }  // UserSchema;
})
