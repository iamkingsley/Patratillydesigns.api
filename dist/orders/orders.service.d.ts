import mongoose, { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './entities/order-status.entity';
import { GetOrderStatusesDto, OrderStatusPaginator } from './dto/get-order-statuses.dto';
import { CheckoutVerificationDto, VerifiedCheckoutData } from './dto/verify-checkout.dto';
import { CreateOrderStatusDto, UpdateOrderStatusDto } from './dto/create-order-status.dto';
export declare class OrdersService {
    private ordersRepository;
    private orderStatusRepository;
    constructor(ordersRepository: Model<Order>, orderStatusRepository: Model<OrderStatus>);
    create(createOrderInput: CreateOrderDto): Promise<mongoose.Document<unknown, any, Order> & Order & {
        _id: string;
    }>;
    getOrders({ limit, page, customer_id, tracking_number, search, shop_id, }: GetOrdersDto): Promise<OrderPaginator>;
    getRecentOrders(): Promise<(mongoose.Document<unknown, any, Order> & Order & {
        _id: string;
    })[]>;
    getTodaysOrders(): Promise<(mongoose.Document<unknown, any, Order> & Order & {
        _id: string;
    })[]>;
    getOrderById(id: string): Promise<mongoose.Document<unknown, any, Order> & Order & {
        _id: string;
    }>;
    getOrderByTrackingNumber(tracking_number: string): Promise<Order>;
    update(id: string, updateOrderInput: UpdateOrderDto): mongoose.Query<mongoose.Document<unknown, any, Order> & Order & {
        _id: string;
    }, mongoose.Document<unknown, any, Order> & Order & {
        _id: string;
    }, {}, Order>;
    remove(id: string): Promise<any>;
    verifyCheckout(input: CheckoutVerificationDto): VerifiedCheckoutData;
    createOrderStatus(createOrderStatusInput: CreateOrderStatusDto): Promise<mongoose.Document<unknown, any, OrderStatus> & OrderStatus & {
        _id: string;
    }>;
    updateOrderStatus(id: string, updateOrderStatusInput: UpdateOrderStatusDto): any;
    getOrderStatuses({ limit, page, search, orderBy, }: GetOrderStatusesDto): Promise<OrderStatusPaginator>;
    getOrderStatus(slug: string): mongoose.Query<mongoose.Document<unknown, any, OrderStatus> & OrderStatus & {
        _id: string;
    }, mongoose.Document<unknown, any, OrderStatus> & OrderStatus & {
        _id: string;
    }, {}, OrderStatus>;
    removeOrderStatus(id: string): Promise<any>;
}
