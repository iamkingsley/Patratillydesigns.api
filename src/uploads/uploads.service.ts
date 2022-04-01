import { Attachment } from './../common/entities/attachment.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ATTRIBUTE_MODEL } from 'src/common/constants';

@Injectable()
export class UploadsService {

  constructor(@Inject(ATTRIBUTE_MODEL)
  private attachmentRepository: Model<Attachment>) { }

  async create(input): Promise<Attachment> {
    const saveInput = {
      ...input,
      created_at: Date.now(),
      updated_at: Date.now()
    }
    return await new this.attachmentRepository(saveInput).save();
  }

  findOne(id: string) {
    return this.attachmentRepository.findOne({ id }).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
