/// <reference types="multer" />
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadImage(file: Array<Express.Multer.File>): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
