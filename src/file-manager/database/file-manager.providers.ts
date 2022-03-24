import { DATABASE_CONNECTION, FILEMANAGER, FILEMANAGER_MODEL } from 'src/common/constants';
import { Connection } from 'mongoose';
import { FileManagerSchema } from './file-manager.schema';

export const fileManagerProviders = [
  {
    provide: FILEMANAGER_MODEL,
    useFactory: (connection: Connection) => connection.model(FILEMANAGER, FileManagerSchema),
    inject: [DATABASE_CONNECTION],
  },
];