import { PRODUCT, PRODUCT_MODEL, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { ProductSchema } from './products.schema';

export const productsProviders = [
  {
    provide: PRODUCT_MODEL,
    useFactory: (connection: Connection) => connection.model(PRODUCT, ProductSchema),
    inject: [DATABASE_CONNECTION],
  },
];