import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController, OrderStatusController } from './orders.controller';
import { ordersProviders, orderStatusProviders } from './database/orders.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [OrdersController, OrderStatusController],
  providers: [
    OrdersService,
  ...ordersProviders,
  ...orderStatusProviders
  ],
  exports: [OrdersService]
})
export class OrdersModule {}
