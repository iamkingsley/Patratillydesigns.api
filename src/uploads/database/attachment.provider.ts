import { ATTACHMENT } from '../../common/constants';
import { ATTRIBUTE_MODEL, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { AttachmentSchema } from 'src/common/schema/attachment.schema';

export const attachmentProviders = [
  {
    provide: ATTRIBUTE_MODEL,
    useFactory: (connection: Connection) => connection.model(ATTACHMENT, AttachmentSchema),
    inject: [DATABASE_CONNECTION],
  },
];