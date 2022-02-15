import { USER, USER_MODEL, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { UserSchema } from './users.schema'

export const usersProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => connection.model(USER, UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];