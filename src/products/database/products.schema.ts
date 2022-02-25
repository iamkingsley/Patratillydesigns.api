import { ATTACHMENT, CATEGORY, ORDER, PRODUCT } from './../../common/constants';
import { TAG } from 'src/common/constants';
import mongoose from 'mongoose';

export const OrderProductPivot = new mongoose.Schema({
  variation_option_id: { type: Number, required: false },
  order_quantity: Number,
  unit_price: Number,
  subtotal: Number,
})

export const VariationSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  sku: String,
  is_disable: Boolean,
  sale_price: { type: Number, required: false },
  quantity: Number,
  options: [],
})

export const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  slug: String,
  // type: Object,
  // type: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'TYPE'
  // },
  type_id: Number,
  product_type: String, // ProductType,
  categories: [{
    type: mongoose.Types.ObjectId,
    ref: CATEGORY
  }],
  tags: [{
    type: mongoose.Types.ObjectId,
    ref: TAG,
    required: false,
  }],
  variations: [{
    type: mongoose.Types.ObjectId,
    // ref: 'AttributeValueSchema',
    required: false
  }],
  variation_options: [{
    type: mongoose.Types.ObjectId,
    // ref: 'VariationSchema',
    required: false
  }],
  pivot: {
    type: mongoose.Types.ObjectId,
    required: false
  }, 
  orders: [], 
  shop: {
    type: mongoose.Types.ObjectId,
    ref: 'SHOP',
    required: false
  },
  shop_id: Number,
  related_products: [{
    type: mongoose.Types.ObjectId,
    ref: PRODUCT,
    required: false
  }], 
  description: String,
  in_stock: Boolean,
  is_taxable: Boolean,
  is_featured: Boolean,
  sale_price: { type: Number, required: false }, 
  max_price: { type: Number, required: false }, 
  min_price: { type: Number, required: false }, 
  sku: { type: String, required: false },
  gallery: [{
    type: mongoose.Types.ObjectId,
    ref: ATTACHMENT,
    required: false
  }],
  image: {
    type: mongoose.Types.ObjectId,
    ref: ATTACHMENT,
    required: false
  },
  status: String, 
  height: { type: String, required: false },
  length: { type: String, required: false },
  width: { type: String, required: false },
  price: { type: Number, required: false },
  quantity: Number,
  unit: String,
  created_at: Date,
  updated_at: Date,
});
