"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendSchema = void 0;
const mongoose_extend_schema_1 = __importDefault(require("mongoose-extend-schema"));
const extendSchema = (schema, extention) => (0, mongoose_extend_schema_1.default)(schema, extention);
exports.extendSchema = extendSchema;
//# sourceMappingURL=extend-schema.js.map