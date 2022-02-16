import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadsService } from './uploads.service';

@Controller('attachments')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private cloudinaryService: CloudinaryService,
    ) {}

  // @Post()
  // @UseInterceptors(FilesInterceptor('attachment[]'))
  // uploadFile(@UploadedFiles() attachment: Array<Express.Multer.File>) {
  //   console.log(attachment);
  //   return [
  //     {
  //       id: '883',
  //       original:
  //         'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/881/aatik-tasneem-7omHUGhhmZ0-unsplash%402x.png',
  //       thumbnail:
  //         'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/881/conversions/aatik-tasneem-7omHUGhhmZ0-unsplash%402x-thumbnail.jpg',
  //     },
  //   ];
  // }
  
  @Post()
  @UseInterceptors(FilesInterceptor('attachment[]'))
  async uploadImageToCloudinary(@UploadedFiles() attachment: Array<Express.Multer.File>) {
    console.log("file :", attachment)
    return await this.cloudinaryService.uploadImage(attachment).then((response) => {
       const {
        asset_id,
        url,
       } = response;
       this.uploadsService.create({
          asset_id,
          original: url,
          thumbnail: url 
        })

     return [
        {
          id: response.asset_id,
          original: response.url,
          thumbnail: response.url,
        }
      ]
    }).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}
