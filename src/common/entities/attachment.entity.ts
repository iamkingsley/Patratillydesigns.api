import { CoreEntity } from 'src/common/entities/core.entity';

export class Attachment extends CoreEntity {
  id?: string;
  _id?: string;
  thumbnail?: string;
  original?: string;
}
