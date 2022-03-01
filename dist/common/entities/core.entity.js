"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEntity = void 0;
const openapi = require("@nestjs/swagger");
class CoreEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, _id: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date } };
    }
}
exports.CoreEntity = CoreEntity;
//# sourceMappingURL=core.entity.js.map