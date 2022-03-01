"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsProviders = void 0;
const constants_1 = require("../../common/constants");
const products_schema_1 = require("./products.schema");
exports.productsProviders = [
    {
        provide: constants_1.PRODUCT_MODEL,
        useFactory: (connection) => connection.model(constants_1.PRODUCT, products_schema_1.ProductSchema),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=products.providers.js.map