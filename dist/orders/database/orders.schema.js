"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const constants_1 = require("../../common/constants");
const mongoose_1 = __importDefault(require("mongoose"));
exports.OrderSchema = new mongoose_1.default.Schema({
    id: String,
    tracking_number: String,
    customer_id: Number,
    customer_contact: String,
    customer: {
        type: mongoose_1.default.Types.ObjectId,
        ref: constants_1.USER
    },
    parent_order: {
        type: mongoose_1.default.Types.ObjectId,
        required: false
    },
    children: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_1.ORDER
        }],
    status: String,
    amount: Number,
    sales_tax: Number,
    total: Number,
    paid_total: Number,
    payment_id: { type: String, required: false },
    payment_gateway: String,
    coupon: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'COUPON',
        required: false
    },
    shop: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'SHOP'
    },
    discount: { type: Number, required: false },
    delivery_fee: Number,
    delivery_time: String,
    products: [],
    billing_address: Object,
    shipping_address: Object,
    created_at: String,
    updated_at: String
});
//# sourceMappingURL=orders.schema.js.map