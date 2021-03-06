import { DATABASE_CONNECTION } from './../common/constants';
import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGODB_CLOUD_SERVER),
  },
];