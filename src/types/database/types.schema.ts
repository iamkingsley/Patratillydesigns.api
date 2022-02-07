import mongoose from 'mongoose'
import { AttachmentSchema } from "src/common/schema/attachment.schema";

export const BannerSchema = new mongoose.Schema({
  id: Number,
  title: { type: String, required: false },
  description: { type: String, required: false },
  image: AttachmentSchema,
})


export const TypeSettingsSchema = new mongoose.Schema({
  isHome: Boolean,
  layoutType: String,
  productCard: String,
})

export const TypeSchema  = new mongoose.Schema({
  name: String,
  slug: String,
  image: AttachmentSchema,
  icon: String,
  banners: { type: [BannerSchema], required: false },
  promotional_sliders: { type: [AttachmentSchema], required: false },
  settings: { type: [TypeSettingsSchema], required: false },
});
