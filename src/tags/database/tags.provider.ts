import { TAGS } from '../../common/constants';
import { TAGS_MODEL, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { TagSchema } from './tags.schema';

export const tagsProviders = [
  {
    provide: TAGS_MODEL,
    useFactory: (connection: Connection) => connection.model(TAGS, TagSchema),
    inject: [DATABASE_CONNECTION],
  },
];