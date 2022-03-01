"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusController = exports.OrdersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const get_orders_dto_1 = require("./dto/get-orders.dto");
const create_order_status_dto_1 = require("./dto/create-order-status.dto");
const get_order_statuses_dto_1 = require("./dto/get-order-statuses.dto");
const verify_checkout_dto_1 = require("./dto/verify-checkout.dto");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(createOrderDto) {
        return this.ordersService.create(createOrderDto);
    }
    async getOrders(query) {
        return this.ordersService.getOrders(query);
    }
    getOrderById(id) {
        return this.ordersService.getOrderById(id);
    }
    getOrderByTrackingNumber(tracking_id) {
        return this.ordersService.getOrderByTrackingNumber(tracking_id);
    }
    update(id, updateOrderDto) {
        return this.ordersService.update(id, updateOrderDto);
    }
    remove(id) {
        return this.ordersService.remove(id);
    }
    verifyCheckout(query) {
        return this.ordersService.verifyCheckout(query);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/get-orders.dto").OrderPaginator }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_orders_dto_1.GetOrdersDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Get)('tracking-number/:tracking_id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/order.entity").Order }),
    __param(0, (0, common_1.Param)('tracking_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOrderByTrackingNumber", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('checkout/verify'),
    openapi.ApiResponse({ status: 201, type: require("./dto/verify-checkout.dto").VerifiedCheckoutData }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_checkout_dto_1.CheckoutVerificationDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "verifyCheckout", null);
OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
exports.OrdersController = OrdersController;
let OrderStatusController = class OrderStatusController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(createOrderStatusDto) {
        return this.ordersService.createOrderStatus(createOrderStatusDto);
    }
    findAll(query) {
        return this.ordersService.getOrderStatuses(query);
    }
    findOne(slug) {
        return this.ordersService.getOrderStatus(slug);
    }
    async update(id, updateOrderStatusDto) {
        console.log("update: ", id, " updateOrderStatusDto: ", updateOrderStatusDto);
        return await this.ordersService.updateOrderStatus(id, updateOrderStatusDto);
    }
    remove(id) {
        return this.ordersService.removeOrderStatus(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_status_dto_1.CreateOrderStatusDto]),
    __metadata("design:returntype", void 0)
], OrderStatusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/get-order-statuses.dto").OrderStatusPaginator }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_order_statuses_dto_1.GetOrderStatusesDto]),
    __metadata("design:returntype", void 0)
], OrderStatusController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderStatusController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_order_status_dto_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", Promise)
], OrderStatusController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderStatusController.prototype, "remove", null);
OrderStatusController = __decorate([
    (0, common_1.Controller)('order-status'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrderStatusController);
exports.OrderStatusController = OrderStatusController;
//# sourceMappingURL=orders.controller.js.map