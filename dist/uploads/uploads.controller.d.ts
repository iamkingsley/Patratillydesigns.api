/// <reference types="multer" />
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    private cloudinaryService;
    constructor(uploadsService: UploadsService, cloudinaryService: CloudinaryService);
    uploadImageToCloudinary(attachment: Array<Express.Multer.File>): Promise<{
        _id: string;
        id: any;
        original: any;
        thumbnail: any;
    }[]>;
}
