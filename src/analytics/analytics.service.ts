import { OrdersService } from './../orders/orders.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {

  constructor(private ordersService: OrdersService) {}

  async findAll() {
    const recentOrders = await this.ordersService.getRecentOrders();
    const todaysOrders = await this.ordersService.getTodaysOrders();
    
    return {
      totalRevenue: recentOrders.reduce((accum, current, currentIndex, arr) => accum + Number(current.amount) , 0),
      todaysRevenue: todaysOrders.reduce((accum, current, currentIndex, arr) => accum + Number(current.amount) , 0),
      totalOrders: recentOrders.length,
    }
  }
}
