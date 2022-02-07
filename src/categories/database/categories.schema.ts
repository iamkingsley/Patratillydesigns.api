import { TypeSchema } from 'src/types/database/types.schema';
import mongoose from 'mongoose';
import { AttachmentSchema } from "src/common/schema/attachment.schema";
import { ProductSchema } from 'src/products/database/products.schema';

export const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  parent: { type: Object, required: false },// CategorySchema;
  children: { type: [Object] },// [CategorySchema];
  details: { type: String },
  image: { type: AttachmentSchema, required: false },
  icon: { type: Object, required: false },
  type: { type: TypeSchema }, // TypeSchema;
  products: { type: [ProductSchema], required: false },// [ProductSchema],
})