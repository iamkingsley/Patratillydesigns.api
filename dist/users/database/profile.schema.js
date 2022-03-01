"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSchema = exports.SocialSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../../common/constants");
exports.SocialSchema = new mongoose_1.default.Schema({
    type: String,
    link: String
});
exports.ProfileSchema = new mongoose_1.default.Schema({
    avatar: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'ATTACHMENT',
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    socials: {
        type: [exports.SocialSchema],
        required: false
    },
    contact: {
        type: String,
        required: false
    },
    customer: {
        type: mongoose_1.default.Types.ObjectId,
        ref: constants_1.USER,
        required: false
    }
});
//# sourceMappingURL=profile.schema.js.map