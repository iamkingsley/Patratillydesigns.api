"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.OrderStatusSchema = new mongoose_1.default.Schema({
    id: String,
    created_at: Date,
    updated_at: Date,
    name: String,
    color: String,
    serial: String,
});
//# sourceMappingURL=order-status.schema.js.map