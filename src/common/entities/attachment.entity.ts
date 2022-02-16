import { CoreEntity } from 'src/common/entities/core.entity';

export class Attachment extends CoreEntity {
  _id: string;
  thumbnail?: string;
  original?: string;
}
