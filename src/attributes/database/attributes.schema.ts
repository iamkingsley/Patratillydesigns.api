import mongoose from 'mongoose';

export const AttributeValueSchema = new mongoose.Schema({
    shop_id: Number,
    value: String,
    meta: { type: String, required: false },
    attribute: {
        type: mongoose.Types.ObjectId,
        ref: 'AttributeSchema'
    },
})

export const AttributeSchema = new mongoose.Schema({
    id: String,
    name: String,
    shop_id: Number,
    shop: {
        type: mongoose.Types.ObjectId,
        ref: 'ShopSchema',
    },
    slug: String,
    values: [{ type: mongoose.Types.ObjectId }], // AttributeValueSchema
    created_at: Date,
    updated_at: Date,
})