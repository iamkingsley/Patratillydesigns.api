"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const constants_1 = require("../common/constants");
exports.CloudinaryProvider = {
    provide: constants_1.CLOUDINARY,
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'witchcraft',
            api_key: '536134274247873',
            api_secret: 'APOnVgPl5GbgCzhq01_e1VCF6u8',
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map