"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ContactSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    subject: String,
    description: String,
});
//# sourceMappingURL=contacts.schema.js.map