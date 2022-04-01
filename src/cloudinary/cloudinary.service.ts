import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream from 'buffer-to-stream';
// import toReadableStream from 'to-readable-stream';
@Injectable()

export class CloudinaryService {
  async uploadImage(
    file: Array<Express.Multer.File>,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({
        folder: 'patratillydesigns',
      }, (error, result) => {
        if (error) return reject(error);
        console.log("result:", result)
        resolve(result);
      });

      toStream(file[0].buffer).pipe(upload);
    });
  }

  async deleteImage(file: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.destroy(file, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  async getImage(file: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.explode(file, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }


}