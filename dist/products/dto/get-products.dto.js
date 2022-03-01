"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProductsOrderByColumn = exports.GetProductsDto = exports.ProductPaginator = void 0;
const openapi = require("@nestjs/swagger");
const generic_conditions_dto_1 = require("../../common/dto/generic-conditions.dto");
const pagination_args_dto_1 = require("../../common/dto/pagination-args.dto");
const paginator_dto_1 = require("../../common/dto/paginator.dto");
class ProductPaginator extends paginator_dto_1.Paginator {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../entities/product.entity").Product] } };
    }
}
exports.ProductPaginator = ProductPaginator;
class GetProductsDto extends pagination_args_dto_1.PaginationArgs {
    static _OPENAPI_METADATA_FACTORY() {
        return { orderBy: { required: false, enum: require("./get-products.dto").QueryProductsOrderByColumn }, sortedBy: { required: false, enum: require("../../common/dto/generic-conditions.dto").SortOrder }, search: { required: false, type: () => String } };
    }
}
exports.GetProductsDto = GetProductsDto;
var QueryProductsOrderByColumn;
(function (QueryProductsOrderByColumn) {
    QueryProductsOrderByColumn["CREATED_AT"] = "CREATED_AT";
    QueryProductsOrderByColumn["NAME"] = "NAME";
    QueryProductsOrderByColumn["UPDATED_AT"] = "UPDATED_AT";
})(QueryProductsOrderByColumn = exports.QueryProductsOrderByColumn || (exports.QueryProductsOrderByColumn = {}));
//# sourceMappingURL=get-products.dto.js.map