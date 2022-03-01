"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentProviders = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../../common/constants");
const attachment_schema_1 = require("../../common/schema/attachment.schema");
exports.attachmentProviders = [
    {
        provide: constants_2.ATTRIBUTE_MODEL,
        useFactory: (connection) => connection.model(constants_1.ATTACHMENT, attachment_schema_1.AttachmentSchema),
        inject: [constants_2.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=attachment.provider.js.map