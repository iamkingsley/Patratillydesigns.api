import { TAG } from '../../common/constants';
import { TAG_MODEL, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { TagSchema } from './tags.schema';

export const tagsProviders = [
  {
    provide: TAG_MODEL,
    useFactory: (connection: Connection) => connection.model(TAG, TagSchema),
    inject: [DATABASE_CONNECTION],
  },
];