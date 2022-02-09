import { CATEGORY } from '../../common/constants';
import { CATEGORY_MODEL, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { CategorySchema } from './categories.schema';

export const categoriesProviders = [
  {
    provide: CATEGORY_MODEL,
    useFactory: (connection: Connection) => connection.model(CATEGORY, CategorySchema),
    inject: [DATABASE_CONNECTION],
  },
];