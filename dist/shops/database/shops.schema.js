"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const users_schema_1 = require("../../users/database/users.schema");
exports.ShopSchema = new mongoose_1.default.Schema({
    owner_id: Number,
    owner: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'UserSchema'
    },
    staffs: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'UserSchema',
            required: false
        }],
    is_active: Boolean,
    orders_count: Number,
    products_count: Number,
    balance: {
        type: mongoose_1.default.Types.ObjectId,
        required: false
    },
    name: String,
    slug: String,
    description: { type: String, required: false },
    cover_image: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'AttachmentSchema'
    },
    logo: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'AttachmentSchema',
        required: false
    },
    address: {
        type: mongoose_1.default.Types.ObjectId,
    },
    settings: {
        type: mongoose_1.default.Types.ObjectId,
        required: false
    },
});
//# sourceMappingURL=shops.schema.js.map