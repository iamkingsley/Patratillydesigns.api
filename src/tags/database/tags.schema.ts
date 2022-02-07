import { TypeSchema } from 'src/types/database/types.schema';
import mongoose from 'mongoose';
import { AttachmentSchema } from "src/common/schema/attachment.schema";
import { ProductSchema } from 'src/products/database/products.schema';

export const TagSchema = new mongoose.Schema({
  name: String,
  slug: String,
  parent: Number,
  details: String,
  image: { type: AttachmentSchema },
  icon: String,
  type: { type: TypeSchema },
  products: { type: [ProductSchema] },
})
  