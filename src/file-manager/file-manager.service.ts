import { FILEMANAGER } from './../common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FILEMANAGER_MODEL } from 'src/common/constants';
import { CreateFileManagerDto } from './dto/create-file-manager.dto';
import { UpdateFileManagerDto } from './dto/update-file-manager.dto';
import { FileManager } from './entities/file-manager.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class FileManagerService {
  
  constructor(
    @Inject(FILEMANAGER_MODEL) private fileManagerRepository:Model<FileManager>,
    private cloudinaryService: CloudinaryService) {
  }
  create(createFileManagerDto: CreateFileManagerDto) {
    return 'This action adds a new fileManager';
  }

  async findAll() {
    const images = await this.cloudinaryService.getAllImages();
    console.log("filemanager", images)
    return  images;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileManager`;
  }

  update(id: number, updateFileManagerDto: UpdateFileManagerDto) {
    return `This action updates a #${id} fileManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileManager`;
  }
}
