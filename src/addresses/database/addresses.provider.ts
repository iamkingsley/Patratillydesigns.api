import { ADDRES_MODEL, DATABASE_CONNECTION, ADDRESS } from 'src/common/constants';
import { Connection } from 'mongoose';
import { AddressSchema } from './addresses.schema';

export const addressesProviders = [
  {
    provide: ADDRES_MODEL,
    useFactory: (connection: Connection) => connection.model(ADDRESS, AddressSchema),
    inject: [DATABASE_CONNECTION],
  },
];