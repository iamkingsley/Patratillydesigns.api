import { TypeSchema } from 'src/types/database/types.schema';
import mongoose from 'mongoose';
import { AttachmentSchema } from "src/common/schema/attachment.schema";
import { ProductSchema } from 'src/products/database/products.schema';

export const TagSchema = new mongoose.Schema({
  id: String,
  name: String,
  slug: String,
  parent: Number,
  details: String,
  image: { type: AttachmentSchema },
  icon: String,
  type: { type: TypeSchema },
  products: { type: [ProductSchema] },
  created_at: Date,
  updated_at: Date,
})
  