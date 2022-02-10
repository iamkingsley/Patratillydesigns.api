import { ATTRIBUTE_MODEL, DATABASE_CONNECTION, ATTRIBUTE } from 'src/common/constants';
import { Connection } from 'mongoose';
import { AttributeSchema } from './attributes.schema';

export const attributesProviders = [
  {
    provide: ATTRIBUTE_MODEL,
    useFactory: (connection: Connection) => connection.model(ATTRIBUTE, AttributeSchema),
    inject: [DATABASE_CONNECTION],
  },
];