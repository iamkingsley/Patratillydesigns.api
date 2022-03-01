"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attributesProviders = void 0;
const constants_1 = require("../../common/constants");
const attributes_schema_1 = require("./attributes.schema");
exports.attributesProviders = [
    {
        provide: constants_1.ATTRIBUTE_MODEL,
        useFactory: (connection) => connection.model(constants_1.ATTRIBUTE, attributes_schema_1.AttributeSchema),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=attributes.provider.js.map