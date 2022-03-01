"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const constants_1 = require("./../common/constants");
const mongoose_1 = __importDefault(require("mongoose"));
exports.databaseProviders = [
    {
        provide: constants_1.DATABASE_CONNECTION,
        useFactory: () => mongoose_1.default.connect(process.env.MONGODB_CLOUD_SERVER),
    },
];
//# sourceMappingURL=database.providers.js.map