"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const constants_1 = require("./../../common/constants");
const constants_2 = require("../../common/constants");
const mongoose_1 = __importDefault(require("mongoose"));
exports.CategorySchema = new mongoose_1.default.Schema({
    id: String,
    created_at: Date,
    updated_at: Date,
    name: String,
    slug: String,
    parent_id: String,
    parent: {
        type: mongoose_1.default.Types.ObjectId,
        ref: constants_1.CATEGORY,
        required: false
    },
    children: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_1.CATEGORY
        }],
    details: String,
    image: {
        type: mongoose_1.default.Types.ObjectId,
        ref: constants_1.ATTACHMENT,
        required: false
    },
    icon: String,
    products: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_2.PRODUCT,
            required: false
        }],
});
//# sourceMappingURL=categories.schema.js.map