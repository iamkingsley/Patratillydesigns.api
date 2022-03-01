"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shippingsProviders = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../../common/constants");
const shippings_schema_1 = require("./shippings.schema");
exports.shippingsProviders = [
    {
        provide: constants_2.SHIPPING_MODEL,
        useFactory: (connection) => connection.model(constants_1.SHIPPING, shippings_schema_1.ShippingSchema),
        inject: [constants_2.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=shippings.provider.js.map