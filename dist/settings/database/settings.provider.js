"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsProviders = void 0;
const constants_1 = require("../../common/constants");
const settings_schema_1 = require("./settings.schema");
exports.settingsProviders = [
    {
        provide: constants_1.SETTINGS_MODEL,
        useFactory: (connection) => connection.model(constants_1.SETTINGS, settings_schema_1.SettingsSchema),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=settings.provider.js.map