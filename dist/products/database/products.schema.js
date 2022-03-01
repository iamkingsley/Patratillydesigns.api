"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.VariationSchema = exports.OrderProductPivot = void 0;
const constants_1 = require("./../../common/constants");
const constants_2 = require("../../common/constants");
const mongoose_1 = __importDefault(require("mongoose"));
exports.OrderProductPivot = new mongoose_1.default.Schema({
    variation_option_id: { type: Number, required: false },
    order_quantity: Number,
    unit_price: Number,
    subtotal: Number,
});
exports.VariationSchema = new mongoose_1.default.Schema({
    id: Number,
    title: String,
    price: Number,
    sku: String,
    is_disable: Boolean,
    sale_price: { type: Number, required: false },
    quantity: Number,
    options: [],
});
exports.ProductSchema = new mongoose_1.default.Schema({
    id: String,
    name: String,
    slug: String,
    type_id: Number,
    product_type: String,
    categories: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_1.CATEGORY
        }],
    tags: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_2.TAG,
            required: false,
        }],
    variations: [{
            type: mongoose_1.default.Types.ObjectId,
            required: false
        }],
    variation_options: [{
            type: mongoose_1.default.Types.ObjectId,
            required: false
        }],
    pivot: {
        type: mongoose_1.default.Types.ObjectId,
        required: false
    },
    orders: [],
    shop: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'SHOP',
        required: false
    },
    shop_id: Number,
    related_products: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_1.PRODUCT,
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
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_1.ATTACHMENT,
            required: false
        }],
    image: {
        type: mongoose_1.default.Types.ObjectId,
        ref: constants_1.ATTACHMENT,
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
//# sourceMappingURL=products.schema.js.map