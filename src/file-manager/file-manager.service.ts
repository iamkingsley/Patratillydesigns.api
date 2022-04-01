import { Attachment } from 'src/common/entities/attachment.entity';
import { ATTRIBUTE_MODEL, FILEMANAGER } from './../common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FILEMANAGER_MODEL } from 'src/common/constants';
import { CreateFileManagerDto } from './dto/create-file-manager.dto';
import { UpdateFileManagerDto } from './dto/update-file-manager.dto';
import { FileManager } from './entities/file-manager.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class FileManagerService {
  constructor(@Inject(ATTRIBUTE_MODEL)
  private attachmentRepository: Model<Attachment>) { }

  // constructor(
  //   @Inject(FILEMANAGER_MODEL) private fileManagerRepository:Model<FileManager>,
  //   private cloudinaryService: CloudinaryService) {
  // }
  // create(createFileManagerDto: CreateFileManagerDto) {
  //   return 'This action adds a new fileManager';
  // }

  async findAll() {
    const images = await this.attachmentRepository.find();
    return images;
  }

  findOne(id: string) {
    return this.attachmentRepository.findOne({ id }).exec();
  }

  update(id: string, updateFileManagerDto: UpdateFileManagerDto) {
    return `This action updates a #${id} fileManager`;
  }

  remove(id: string) {
    this.attachmentRepository.findOneAndRemove({ public_id: id }).exec();
  }
}
