"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProviders = void 0;
const constants_1 = require("../../common/constants");
const users_schema_1 = require("./users.schema");
exports.usersProviders = [
    {
        provide: constants_1.USER_MODEL,
        useFactory: (connection) => connection.model(constants_1.USER, users_schema_1.UserSchema),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=users.provider.js.map