import mongoose, { Model } from 'mongoose';
import { v4 } from 'uuid';
import orderNo from 'order-no';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './entities/order-status.entity';
import { paginate } from 'src/common/pagination/paginate';
import {
  GetOrderStatusesDto,
  OrderStatusPaginator,
} from './dto/get-order-statuses.dto';
import {
  CheckoutVerificationDto,
  VerifiedCheckoutData,
} from './dto/verify-checkout.dto';
import {
  CreateOrderStatusDto,
  UpdateOrderStatusDto,
} from './dto/create-order-status.dto';
import { ORDER_MODEL, ORDERSTATUS_MODEL } from 'src/common/constants';
@Injectable()
export class OrdersService {

  constructor(
    @Inject(ORDER_MODEL) private ordersRepository: Model<Order>,
    @Inject(ORDERSTATUS_MODEL) private orderStatusRepository: Model<OrderStatus>
  ) {}

  /**
   * ORDER SERVICES
   */
  async create(createOrderInput: CreateOrderDto) {
    const orderNum = orderNo.makeOrderNo(1, 8);
    const newOrder = {
      id: orderNum,
      tracking_number: orderNum,
      customer: {
        ...createOrderInput,
        _id: new mongoose.Types.ObjectId(createOrderInput.customer?._id),
      },
      ...createOrderInput,
      created_at: new Date(),
      updated_at: new Date(),
    }
    const order = new this.ordersRepository(newOrder)
    return await order.save();
  }

  async getOrders({
    limit,
    page,
    customer_id,
    tracking_number,
    search,
    shop_id,
  }: GetOrdersDto): Promise<OrderPaginator> {
    if (!page) page = 1;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let orders: Order[] = await this.ordersRepository
      .find()
      .populate('products')
      .populate('billing_address')
      .populate('shipping_address')
      .populate('customer')
      .sort({ created_at: -1 })
      .exec();

    if (shop_id && shop_id !== 'undefined') {
      orders = orders?.filter((p) => p?.shop?.id === shop_id);
    }
    const results = orders.slice(startIndex, endIndex);
    const url = `/orders?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(orders.length, page, limit, results.length, url),
    };
  }

  getRecentOrders() {
    return this.ordersRepository.find({
      created_at: {
        $lte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
      },
    })
    .populate('customer')
    .sort({ created_at: -1 })
    .exec()
  }

  getTodaysOrders() {
    return this.ordersRepository.find({
      created_at: {
        $lte: new Date((new Date().getTime() - (24 * 60 * 60 * 1000)))
      }
    })
    .exec()
  }

  getOrderById(id: string) {
    return this.ordersRepository
      .findOne({ id })
      .populate('billing_address')
      .populate('shipping_address')
      .populate('customer')
      .exec();
  }

  async getOrderByTrackingNumber(tracking_number: string): Promise<Order> {
    const parentOrder = await this.ordersRepository
    .findOne({ tracking_number })
    .populate('customer');

    if (!parentOrder) {
      return null; // or NotFound
    }
    return parentOrder;
  }
  
  update(id: string, updateOrderInput: UpdateOrderDto) {
    return this.ordersRepository.findOneAndUpdate(
      { id },
      {
        ...updateOrderInput,
        updated_at: Date() 
      }
    )
  }

  remove(id: string): Promise<any> {
    return this.ordersRepository.deleteOne({ id }).exec();
  }

  verifyCheckout(input: CheckoutVerificationDto): VerifiedCheckoutData {
    return {
      total_tax: 0,
      shipping_charge: 0,
      unavailable_products: [],
      wallet_currency: 0,
      wallet_amount: 0,
    };
  }
  
  /**
   * ORDER STATUS SERVICES
   */
  createOrderStatus(createOrderStatusInput: CreateOrderStatusDto) {
    const status = {
      id: v4(),
      ...createOrderStatusInput,
      created_at: new Date(),
      updated_at: new Date(),
    }
    const newStatus = new this.orderStatusRepository(status);
    return newStatus.save();
  }

  updateOrderStatus(id: string, updateOrderStatusInput: UpdateOrderStatusDto): any {
    return this.orderStatusRepository.updateOne(
        { id },
        {...updateOrderStatusInput}
      ).exec();
  }

  async getOrderStatuses({
    limit,
    page,
    search,
    orderBy,
  }: GetOrderStatusesDto): Promise<OrderStatusPaginator> {
    if (!page || page.toString() === 'undefined') page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data = await this.orderStatusRepository.find().exec();

    // if (shop_id) {
    //   data = this.orders?.filter((p) => p?.shop?.id === shop_id);
    // }
    const results = data.slice(startIndex, endIndex);
    const url = `/order-status?search=${search}&limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  getOrderStatus(slug: string) {
    return this.orderStatusRepository.findOne({ slug });
  }

  removeOrderStatus(id: string) {
    return this.orderStatusRepository.remove({ id }).exec();
  }
}
