"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagSchema = void 0;
const constants_1 = require("./../../common/constants");
const mongoose_1 = __importDefault(require("mongoose"));
exports.TagSchema = new mongoose_1.default.Schema({
    id: String,
    name: String,
    slug: String,
    parent: Number,
    details: String,
    image: {
        type: mongoose_1.default.Types.ObjectId,
        ref: constants_1.ATTACHMENT,
        required: false,
    },
    icon: String,
    type: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'TypeSchema',
    },
    products: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_1.PRODUCT
        }],
    created_at: Date,
    updated_at: Date,
});
//# sourceMappingURL=tags.schema.js.map