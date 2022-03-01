"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesProviders = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../../common/constants");
const categories_schema_1 = require("./categories.schema");
exports.categoriesProviders = [
    {
        provide: constants_2.CATEGORY_MODEL,
        useFactory: (connection) => connection.model(constants_1.CATEGORY, categories_schema_1.CategorySchema),
        inject: [constants_2.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=categories.provider.js.map