import { SHIPPING } from '../../common/constants';
import { SHIPPING_MODEL, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { ShippingSchema } from './shippings.schema';

export const shippingsProviders = [
  {
    provide: SHIPPING_MODEL,
    useFactory: (connection: Connection) => connection.model(SHIPPING, ShippingSchema),
    inject: [DATABASE_CONNECTION],
  },
];