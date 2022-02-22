import mongoose from 'mongoose';

export const AttributeSchema = new mongoose.Schema({
    id: String,
    name: String,
    // shop_id: Number,
    // shop: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'ShopSchema',
    // },
    slug: String,
    values: [], // AttributeValueSchema
    created_at: Date,
    updated_at: Date,
})