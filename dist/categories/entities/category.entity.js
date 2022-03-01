"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const openapi = require("@nestjs/swagger");
const attachment_entity_1 = require("../../common/entities/attachment.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const product_entity_1 = require("../../products/entities/product.entity");
const type_entity_1 = require("../../types/entities/type.entity");
class Category extends core_entity_1.CoreEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, slug: { required: true, type: () => String }, parent_id: { required: false, type: () => String }, type_id: { required: false, type: () => String }, parent: { required: false, type: () => require("./category.entity").Category }, children: { required: false, type: () => [require("./category.entity").Category] }, details: { required: false, type: () => String }, image: { required: false, type: () => require("../../common/entities/attachment.entity").Attachment }, icon: { required: false, type: () => String }, type: { required: false, type: () => require("../../types/entities/type.entity").Type }, products: { required: false, type: () => [require("../../products/entities/product.entity").Product] } };
    }
}
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map