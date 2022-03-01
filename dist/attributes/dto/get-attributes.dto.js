"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryAttributesOrderByColumn = exports.QueryAttributesOrderByOrderByClause = exports.GetAttributesArgs = void 0;
const openapi = require("@nestjs/swagger");
const generic_conditions_dto_1 = require("../../common/dto/generic-conditions.dto");
class GetAttributesArgs {
    static _OPENAPI_METADATA_FACTORY() {
        return { orderBy: { required: false, type: () => [require("./get-attributes.dto").QueryAttributesOrderByOrderByClause] }, shop_id: { required: false, type: () => Number } };
    }
}
exports.GetAttributesArgs = GetAttributesArgs;
class QueryAttributesOrderByOrderByClause {
    static _OPENAPI_METADATA_FACTORY() {
        return { column: { required: true, enum: require("./get-attributes.dto").QueryAttributesOrderByColumn }, order: { required: true, enum: require("../../common/dto/generic-conditions.dto").SortOrder } };
    }
}
exports.QueryAttributesOrderByOrderByClause = QueryAttributesOrderByOrderByClause;
var QueryAttributesOrderByColumn;
(function (QueryAttributesOrderByColumn) {
    QueryAttributesOrderByColumn["CREATED_AT"] = "CREATED_AT";
    QueryAttributesOrderByColumn["NAME"] = "NAME";
    QueryAttributesOrderByColumn["UPDATED_AT"] = "UPDATED_AT";
})(QueryAttributesOrderByColumn = exports.QueryAttributesOrderByColumn || (exports.QueryAttributesOrderByColumn = {}));
//# sourceMappingURL=get-attributes.dto.js.map