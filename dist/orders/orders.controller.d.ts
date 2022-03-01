/// <reference types="mongoose" />
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import { CreateOrderStatusDto, UpdateOrderStatusDto } from './dto/create-order-status.dto';
import { GetOrderStatusesDto } from './dto/get-order-statuses.dto';
import { CheckoutVerificationDto } from './dto/verify-checkout.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import("mongoose").Document<unknown, any, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
        _id: string;
    }>;
    getOrders(query: GetOrdersDto): Promise<OrderPaginator>;
    getOrderById(id: string): Promise<import("mongoose").Document<unknown, any, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
        _id: string;
    }>;
    getOrderByTrackingNumber(tracking_id: string): Promise<import("./entities/order.entity").Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): import("mongoose").Query<import("mongoose").Document<unknown, any, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
        _id: string;
    }, import("mongoose").Document<unknown, any, import("./entities/order.entity").Order> & import("./entities/order.entity").Order & {
        _id: string;
    }, {}, import("./entities/order.entity").Order>;
    remove(id: string): Promise<any>;
    verifyCheckout(query: CheckoutVerificationDto): import("./dto/verify-checkout.dto").VerifiedCheckoutData;
}
export declare class OrderStatusController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderStatusDto: CreateOrderStatusDto): Promise<import("mongoose").Document<unknown, any, import("./entities/order-status.entity").OrderStatus> & import("./entities/order-status.entity").OrderStatus & {
        _id: string;
    }>;
    findAll(query: GetOrderStatusesDto): Promise<import("./dto/get-order-statuses.dto").OrderStatusPaginator>;
    findOne(slug: string): import("mongoose").Query<import("mongoose").Document<unknown, any, import("./entities/order-status.entity").OrderStatus> & import("./entities/order-status.entity").OrderStatus & {
        _id: string;
    }, import("mongoose").Document<unknown, any, import("./entities/order-status.entity").OrderStatus> & import("./entities/order-status.entity").OrderStatus & {
        _id: string;
    }, {}, import("./entities/order-status.entity").OrderStatus>;
    update(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<any>;
    remove(id: string): Promise<any>;
}
