"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../../common/enums");
exports.AddressSchema = new mongoose_1.default.Schema({
    id: String,
    title: String,
    default: Boolean,
    address: new mongoose_1.default.Schema({
        street_address: String,
        country: String,
        city: String,
        state: String,
        zip: String,
    }),
    type: {
        type: String,
        enum: enums_1.AddressType,
        default: enums_1.AddressType.BILLING
    },
    customer: { type: mongoose_1.default.Types.ObjectId, ref: 'USER' },
    customer_id: String,
});
//# sourceMappingURL=addresses.schema.js.map