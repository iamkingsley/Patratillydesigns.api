import { CONTACT } from '../../common/constants';
import { CONTACT_MODEL, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { ContactSchema } from './contacts.schema';

export const authProviders = [
  {
    provide: CONTACT_MODEL,
    useFactory: (connection: Connection) => connection.model(CONTACT, ContactSchema),
    inject: [DATABASE_CONNECTION],
  },
];