"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const uuid_1 = require("uuid");
const order_no_1 = __importDefault(require("order-no"));
const common_1 = require("@nestjs/common");
const paginate_1 = require("../common/pagination/paginate");
const constants_1 = require("../common/constants");
let OrdersService = class OrdersService {
    constructor(ordersRepository, orderStatusRepository) {
        this.ordersRepository = ordersRepository;
        this.orderStatusRepository = orderStatusRepository;
    }
    async create(createOrderInput) {
        var _a;
        const orderNum = order_no_1.default.makeOrderNo(1, 8);
        const newOrder = Object.assign(Object.assign({ id: orderNum, tracking_number: orderNum, customer: Object.assign(Object.assign({}, createOrderInput), { _id: new mongoose_1.default.Types.ObjectId((_a = createOrderInput.customer) === null || _a === void 0 ? void 0 : _a._id) }) }, createOrderInput), { created_at: new Date(), updated_at: new Date() });
        const order = new this.ordersRepository(newOrder);
        return await order.save();
    }
    async getOrders({ limit, page, customer_id, tracking_number, search, shop_id, }) {
        if (!page)
            page = 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let orders = await this.ordersRepository
            .find()
            .populate('products')
            .populate('billing_address')
            .populate('shipping_address')
            .populate('customer')
            .sort({ created_at: -1 })
            .exec();
        if (shop_id && shop_id !== 'undefined') {
            orders = orders === null || orders === void 0 ? void 0 : orders.filter((p) => { var _a; return ((_a = p === null || p === void 0 ? void 0 : p.shop) === null || _a === void 0 ? void 0 : _a.id) === shop_id; });
        }
        const results = orders.slice(startIndex, endIndex);
        const url = `/orders?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(orders.length, page, limit, results.length, url));
    }
    getRecentOrders() {
        return this.ordersRepository.find({
            created_at: {
                $lte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
            },
        })
            .populate('customer')
            .sort({ created_at: -1 })
            .exec();
    }
    getTodaysOrders() {
        return this.ordersRepository.find({
            created_at: {
                $lte: new Date((new Date().getTime() - (24 * 60 * 60 * 1000)))
            }
        })
            .exec();
    }
    getOrderById(id) {
        return this.ordersRepository
            .findOne({ id })
            .populate('billing_address')
            .populate('shipping_address')
            .populate('customer')
            .exec();
    }
    async getOrderByTrackingNumber(tracking_number) {
        const parentOrder = await this.ordersRepository
            .findOne({ tracking_number })
            .populate('customer');
        if (!parentOrder) {
            return null;
        }
        return parentOrder;
    }
    update(id, updateOrderInput) {
        return this.ordersRepository.findOneAndUpdate({ id }, Object.assign(Object.assign({}, updateOrderInput), { updated_at: Date() }));
    }
    remove(id) {
        return this.ordersRepository.deleteOne({ id }).exec();
    }
    verifyCheckout(input) {
        return {
            total_tax: 0,
            shipping_charge: 0,
            unavailable_products: [],
            wallet_currency: 0,
            wallet_amount: 0,
        };
    }
    createOrderStatus(createOrderStatusInput) {
        const status = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createOrderStatusInput), { created_at: new Date(), updated_at: new Date() });
        const newStatus = new this.orderStatusRepository(status);
        return newStatus.save();
    }
    updateOrderStatus(id, updateOrderStatusInput) {
        return this.orderStatusRepository.updateOne({ id }, Object.assign({}, updateOrderStatusInput)).exec();
    }
    async getOrderStatuses({ limit, page, search, orderBy, }) {
        if (!page || page.toString() === 'undefined')
            page = 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let data = await this.orderStatusRepository.find().exec();
        const results = data.slice(startIndex, endIndex);
        const url = `/order-status?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(data.length, page, limit, results.length, url));
    }
    getOrderStatus(slug) {
        return this.orderStatusRepository.findOne({ slug });
    }
    removeOrderStatus(id) {
        return this.orderStatusRepository.remove({ id }).exec();
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.ORDER_MODEL)),
    __param(1, (0, common_1.Inject)(constants_1.ORDERSTATUS_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map