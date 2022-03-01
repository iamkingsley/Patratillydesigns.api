"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.AttachmentSchema = new mongoose_1.default.Schema({
    asset_id: String,
    thumbnail: { type: String, required: false },
    original: String,
    create_at: Date,
});
//# sourceMappingURL=attachment.schema.js.map