"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const enums_1 = require("./../../common/enums");
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../../common/constants");
const shops_schema_1 = require("../../shops/database/shops.schema");
const profile_schema_1 = require("./profile.schema");
exports.UserSchema = new mongoose_1.default.Schema({
    id: String,
    name: String,
    email: { type: String, unique: true },
    password: String,
    permissions: [{
            type: String,
            default: [enums_1.PERMISSIONS.CUSTOMER]
        }],
    shop_id: {
        type: Number,
        required: false
    },
    profile: {
        type: profile_schema_1.ProfileSchema,
        required: false
    },
    is_active: {
        type: Boolean,
        default: true,
        required: false
    },
    address: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_1.ADDRESS,
            required: false
        }],
    orders: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_1.ORDER,
            required: false
        }],
    measurement: Object,
    created_at: Date,
    updated_at: Date,
});
//# sourceMappingURL=users.schema.js.map