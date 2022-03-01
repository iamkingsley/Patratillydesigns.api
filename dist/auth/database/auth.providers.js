"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProviders = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../../common/constants");
const contacts_schema_1 = require("./contacts.schema");
exports.authProviders = [
    {
        provide: constants_2.CONTACT_MODEL,
        useFactory: (connection) => connection.model(constants_1.CONTACT, contacts_schema_1.ContactSchema),
        inject: [constants_2.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=auth.providers.js.map