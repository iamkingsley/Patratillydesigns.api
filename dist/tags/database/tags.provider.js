"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsProviders = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../../common/constants");
const tags_schema_1 = require("./tags.schema");
exports.tagsProviders = [
    {
        provide: constants_2.TAG_MODEL,
        useFactory: (connection) => connection.model(constants_1.TAG, tags_schema_1.TagSchema),
        inject: [constants_2.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=tags.provider.js.map