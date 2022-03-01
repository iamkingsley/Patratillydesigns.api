"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../../common/constants");
exports.SettingsSchema = new mongoose_1.default.Schema({
    id: String,
    created_at: Date,
    updated_at: Date,
    options: new mongoose_1.default.Schema({
        siteTitle: String,
        siteSubtitle: String,
        currency: String,
        minimumOrderAmount: Number,
        walletToCurrencyRatio: Number,
        signupPoints: Number,
        deliveryTime: [],
        logo: {
            type: mongoose_1.default.Types.ObjectId,
            ref: constants_1.ATTACHMENT,
            required: false
        },
        taxClass: String,
        shippingClass: String,
        seo: new mongoose_1.default.Schema({
            metaTitle: {
                type: String,
                required: false,
            },
            metaDescription: {
                type: String,
                required: false,
            },
            ogTitle: {
                type: String,
                required: false,
            },
            ogDescription: {
                type: String,
                required: false,
            },
            ogImage: {
                type: mongoose_1.default.Types.ObjectId,
                ref: constants_1.ATTACHMENT,
                required: false
            },
            twitterHandle: {
                type: String,
                required: false,
            },
            twitterCardType: {
                type: String,
                required: false,
            },
            metaTags: {
                type: String,
                required: false,
            },
            canonicalUrl: {
                type: String,
                required: false,
            },
        }),
        google: new mongoose_1.default.Schema({
            isEnable: Boolean,
            tagManagerId: String,
        }),
        facebook: new mongoose_1.default.Schema({
            isEnable: Boolean,
            appId: String,
            pageId: String,
        }),
        contactDetails: Object,
        aboutUs: String,
    })
});
//# sourceMappingURL=settings.schema.js.map