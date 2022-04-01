import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { CreateFileManagerDto } from './dto/create-file-manager.dto';
import { UpdateFileManagerDto } from './dto/update-file-manager.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('file-manager')
export class FileManagerController {
  constructor(private readonly fileManagerService: FileManagerService,
    private cloudinaryService: CloudinaryService) { }

  // @Post()
  // create(@Body() createFileManagerDto: CreateFileManagerDto) {
  //   return this.fileManagerService.create(createFileManagerDto);
  // }

  @Get()
  findAll() {
    try {
      return this.fileManagerService.findAll();
    } catch (err) {
      console.log("err", err);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (this.cloudinaryService.getImage(id)) {
      return this.fileManagerService.findOne(id);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileManagerDto: UpdateFileManagerDto) {
    return this.fileManagerService.update(id, updateFileManagerDto);
  }

  @Delete(':public_id')
  async remove(@Param('public_id') public_id: string) {
    const id = public_id.replace("-", '/');
    if (await this.cloudinaryService.deleteImage(id)) {
      return this.fileManagerService.remove(id);
    }
  }

}
