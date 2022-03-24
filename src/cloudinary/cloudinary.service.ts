import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream  from 'buffer-to-stream';
// import toReadableStream from 'to-readable-stream';
@Injectable()

export class CloudinaryService {
  async uploadImage(
    file: Array<Express.Multer.File>,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({
        folder: 'patratillydesigns',
      },(error, result) => {
        if (error) return reject(error);
        console.log("result:", result)
        resolve(result);
      });
     
    //   console.log("gggggggg", file[0].buffer)
      toStream(file[0].buffer).pipe(upload);
    // toReadableStream(file[4].buffer).pipe(upload);
    });
  }

  async getAllImages(){
    
     const upload = v2.url('sample', {format: 'json', type: 'list', sign_url: true})
     console.log("image", upload)
    //  return upload
    //   console.log("gggggggg", file[0].buffer)
      // toStream(file[0].buffer).pipe(upload);
    // toReadableStream(file[4].buffer).pipe(upload);
  }


}