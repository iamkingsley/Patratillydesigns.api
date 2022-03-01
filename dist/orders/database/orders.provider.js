"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusProviders = exports.ordersProviders = void 0;
const constants_1 = require("../../common/constants");
const orders_schema_1 = require("./orders.schema");
const order_status_schema_1 = require("./order-status.schema");
exports.ordersProviders = [
    {
        provide: constants_1.ORDER_MODEL,
        useFactory: (connection) => connection.model(constants_1.ORDER, orders_schema_1.OrderSchema),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
exports.orderStatusProviders = [
    {
        provide: constants_1.ORDERSTATUS_MODEL,
        useFactory: (connection) => connection.model(constants_1.ORDERSTATUS, order_status_schema_1.OrderStatusSchema),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=orders.provider.js.map