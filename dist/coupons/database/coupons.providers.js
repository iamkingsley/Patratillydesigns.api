"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponsProviders = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../../common/constants");
const coupons_schema_1 = require("./coupons.schema");
exports.couponsProviders = [
    {
        provide: constants_2.COUPON_MODEL,
        useFactory: (connection) => connection.model(constants_1.COUPON, coupons_schema_1.CouponSchema),
        inject: [constants_2.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=coupons.providers.js.map