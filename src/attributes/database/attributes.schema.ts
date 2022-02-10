import mongoose from 'mongoose';
import { ShopSchema } from '../../shops/database/shops.schema';
import { CoreSchema } from './../../common/schema/core.schema';

export const AttributeValueSchema = new mongoose.Schema({
    shop_id: Number,
    value: String,
    meta: { type: String, required: false },
    // attribute: { type: AttributeSchema },
})

export const AttributeSchema = new mongoose.Schema({
    id: String,
    name: String,
    shop_id: Number,
    shop: ShopSchema,
    slug: String,
    values: { type: [AttributeValueSchema] },
    created_at: Date,
    updated_at: Date,
})