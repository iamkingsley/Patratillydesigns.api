import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';

export class Gallery extends CoreEntity {
    id: string;
    image: Attachment;
    description?: string;
    slug: string;
}
