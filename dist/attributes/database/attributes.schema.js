"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.AttributeSchema = new mongoose_1.default.Schema({
    id: String,
    name: String,
    slug: String,
    values: [],
    created_at: Date,
    updated_at: Date,
});
//# sourceMappingURL=attributes.schema.js.map