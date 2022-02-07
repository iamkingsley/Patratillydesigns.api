import mongoose from 'mongoose';
import { ShopSchema } from '../../shops/database/shops.schema';
import { CategorySchema } from './../../categories/database/categories.schema';
import { AttachmentSchema } from 'src/common/schema/attachment.schema';
import { TypeSchema } from 'src/types/database/types.schema';
import { TagSchema } from 'src/tags/database/tags.schema';
import { OrderSchema } from 'src/orders/database/orders.schema';
import { AttributeValueSchema } from 'src/attributes/database/attributes.schema';

export const OrderProductPivot = new mongoose.Schema({
  variation_option_id: { type: Number, required: false },
  order_quantity: Number,
  unit_price: Number,
  subtotal: Number,
})

export const VariationOptionSchema = new mongoose.Schema({
  name: String,
  value: String,
})
export const VariationSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  sku: String,
  is_disable: Boolean,
  sale_price: { type: Number, required: false },
  quantity: Number,
  options: { type: [VariationOptionSchema] },
})

export const ProductSchema = new mongoose.Schema({
  name: String,
  slug: String,
  type: { type: TypeSchema },
  type_id: Number,
  product_type: String, // ProductType,
  categories: { type: CategorySchema },
  tags: {
    type: [TagSchema],
    required: false
  },
  variations: {
    type: [AttributeValueSchema],
    required: false
  },
  variation_options: {
    type: [VariationSchema],
    required: false
  },
  pivot: { type: OrderProductPivot, required: false }, 
  orders: { type: [OrderSchema], required: false }, 
  shop: { type: ShopSchema },
  shop_id: Number,
  related_products: { type: [Array], required: false }, 
  description: String,
  in_stock: Boolean,
  is_taxable: Boolean,
  sale_price: { type: Number, required: false }, 
  max_price: { type: Number, required: false }, 
  min_price: { type: Number, required: false }, 
  sku: { type: String, required: false },
  gallery: { type: [AttachmentSchema], required: false },
  image: { type: [AttachmentSchema], required: false },
  status: String, 
  height: { type: String, required: false },
  length: { type: String, required: false },
  width: { type: String, required: false },
  price: { type: Number, required: false },
  quantity: Number,
  unit: String,
});
