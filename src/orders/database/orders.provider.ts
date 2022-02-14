import { ORDER_MODEL, ORDERSTATUS_MODEL, ORDERSTATUS, DATABASE_CONNECTION, ORDER} from 'src/common/constants';
import { Connection } from 'mongoose';
import { OrderSchema } from './orders.schema';
import { OrderStatusSchema } from './order-status.schema';

export const ordersProviders = [
  {
    provide: ORDER_MODEL,
    useFactory: (connection: Connection) => connection.model(ORDER, OrderSchema),
    inject: [DATABASE_CONNECTION],
  },
];

export const orderStatusProviders = [
    {
      provide: ORDERSTATUS_MODEL,
      useFactory: (connection: Connection) => connection.model(ORDERSTATUS, OrderStatusSchema),
      inject: [DATABASE_CONNECTION],
    },
  ];