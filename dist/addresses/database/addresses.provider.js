"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesProviders = void 0;
const constants_1 = require("../../common/constants");
const addresses_schema_1 = require("./addresses.schema");
exports.addressesProviders = [
    {
        provide: constants_1.ADDRES_MODEL,
        useFactory: (connection) => connection.model(constants_1.ADDRESS, addresses_schema_1.AddressSchema),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=addresses.provider.js.map