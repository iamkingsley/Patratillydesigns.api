"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orders_schema_1 = require("./../../orders/database/orders.schema");
const attachment_schema_1 = require("../../common/schema/attachment.schema");
exports.CouponSchema = new mongoose_1.default.Schema({
    id: String,
    created_at: Date,
    updated_at: Date,
    code: String,
    description: { type: String, required: false },
    orders: { type: [orders_schema_1.OrderSchema], required: false },
    type: String,
    image: attachment_schema_1.AttachmentSchema,
    is_valid: Boolean,
    amount: Number,
    active_from: String,
    expire_at: String,
});
//# sourceMappingURL=coupons.schema.js.map