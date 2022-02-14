import { Attachment } from './../common/entities/attachment.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ATTRIBUTE_MODEL } from 'src/common/constants';

@Injectable()
export class UploadsService {
  constructor(@Inject(ATTRIBUTE_MODEL)
  private attachmentRepository: Model<Attachment>) {}

  

  findAll() {
    return `This action returns all uploads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
