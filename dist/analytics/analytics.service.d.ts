import { OrdersService } from './../orders/orders.service';
export declare class AnalyticsService {
    private ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Promise<{
        totalRevenue: number;
        todaysRevenue: number;
        totalOrders: number;
    }>;
}
