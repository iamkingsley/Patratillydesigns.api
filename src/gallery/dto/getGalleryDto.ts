import { Attachment } from "src/common/entities/attachment.entity";

export class GetGalleryDto {
  id: string;
  description: string;
  image: Attachment;
}
