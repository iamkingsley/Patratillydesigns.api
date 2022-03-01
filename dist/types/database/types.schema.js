"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeSchema = exports.TypeSettingsSchema = exports.BannerSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const attachment_schema_1 = require("../../common/schema/attachment.schema");
exports.BannerSchema = new mongoose_1.default.Schema({
    id: Number,
    title: { type: String, required: false },
    description: { type: String, required: false },
    image: attachment_schema_1.AttachmentSchema,
});
exports.TypeSettingsSchema = new mongoose_1.default.Schema({
    isHome: Boolean,
    layoutType: String,
    productCard: String,
});
exports.TypeSchema = new mongoose_1.default.Schema({
    name: String,
    slug: String,
    image: attachment_schema_1.AttachmentSchema,
    icon: String,
    banners: { type: [exports.BannerSchema], required: false },
    promotional_sliders: { type: [attachment_schema_1.AttachmentSchema], required: false },
    settings: { type: [exports.TypeSettingsSchema], required: false },
});
//# sourceMappingURL=types.schema.js.map