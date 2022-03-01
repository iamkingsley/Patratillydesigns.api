"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const shipping_entity_1 = require("../entities/shipping.entity");
exports.ShippingSchema = new mongoose_1.default.Schema({
    id: String,
    created_at: Date,
    updated_at: Date,
    name: String,
    amount: String,
    is_global: Boolean,
    type: {
        type: String,
        enum: shipping_entity_1.ShippingType,
        default: shipping_entity_1.ShippingType.FIXED
    },
});
//# sourceMappingURL=shippings.schema.js.map