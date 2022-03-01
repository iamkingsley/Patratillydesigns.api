"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const openapi = require("@nestjs/swagger");
class Contact {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, subject: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.Contact = Contact;
//# sourceMappingURL=contact.entity.js.map