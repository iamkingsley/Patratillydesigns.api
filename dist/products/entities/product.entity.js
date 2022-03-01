"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariationOption = exports.Variation = exports.OrderProductPivot = exports.Product = exports.ProductType = exports.ProductStatus = void 0;
const openapi = require("@nestjs/swagger");
const attribute_value_entity_1 = require("../../attributes/entities/attribute-value.entity");
const category_entity_1 = require("../../categories/entities/category.entity");
const attachment_entity_1 = require("../../common/entities/attachment.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
const shop_entity_1 = require("../../shops/entities/shop.entity");
const tag_entity_1 = require("../../tags/entities/tag.entity");
const type_entity_1 = require("../../types/entities/type.entity");
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["PUBLISH"] = "publish";
    ProductStatus["DRAFT"] = "draft";
})(ProductStatus = exports.ProductStatus || (exports.ProductStatus = {}));
var ProductType;
(function (ProductType) {
    ProductType["SIMPLE"] = "simple";
    ProductType["VARIABLE"] = "variable";
})(ProductType = exports.ProductType || (exports.ProductType = {}));
class Product extends core_entity_1.CoreEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, slug: { required: true, type: () => String }, type: { required: true, type: () => require("../../types/entities/type.entity").Type }, type_id: { required: true, type: () => Number }, product_type: { required: true, enum: require("./product.entity").ProductType }, categories: { required: true, type: () => [require("../../categories/entities/category.entity").Category] }, tags: { required: false, type: () => [require("../../tags/entities/tag.entity").Tag] }, variations: { required: false, type: () => [require("../../attributes/entities/attribute-value.entity").AttributeValue] }, variation_options: { required: false, type: () => [require("./product.entity").Variation] }, pivot: { required: false, type: () => require("./product.entity").OrderProductPivot }, orders: { required: false, type: () => [Object] }, shop: { required: true, type: () => require("../../shops/entities/shop.entity").Shop }, shop_id: { required: true, type: () => Number }, related_products: { required: false, type: () => [require("./product.entity").Product] }, description: { required: true, type: () => String }, in_stock: { required: true, type: () => Boolean }, is_taxable: { required: true, type: () => Boolean }, is_featured: { required: true, type: () => Boolean }, sale_price: { required: false, type: () => Number }, max_price: { required: false, type: () => Number }, min_price: { required: false, type: () => Number }, sku: { required: false, type: () => String }, gallery: { required: false, type: () => [require("../../common/entities/attachment.entity").Attachment] }, image: { required: false, type: () => require("../../common/entities/attachment.entity").Attachment }, status: { required: true, enum: require("./product.entity").ProductStatus }, height: { required: false, type: () => String }, length: { required: false, type: () => String }, width: { required: false, type: () => String }, price: { required: false, type: () => Number }, quantity: { required: true, type: () => Number }, unit: { required: true, type: () => String } };
    }
}
exports.Product = Product;
class OrderProductPivot {
    static _OPENAPI_METADATA_FACTORY() {
        return { variation_option_id: { required: false, type: () => Number }, order_quantity: { required: true, type: () => Number }, unit_price: { required: true, type: () => Number }, subtotal: { required: true, type: () => Number } };
    }
}
exports.OrderProductPivot = OrderProductPivot;
class Variation {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, price: { required: true, type: () => Number }, sku: { required: true, type: () => String }, is_disable: { required: true, type: () => Boolean }, sale_price: { required: false, type: () => Number }, quantity: { required: true, type: () => Number }, options: { required: true, type: () => [require("./product.entity").VariationOption] } };
    }
}
exports.Variation = Variation;
class VariationOption {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, value: { required: true, type: () => String } };
    }
}
exports.VariationOption = VariationOption;
//# sourceMappingURL=product.entity.js.map