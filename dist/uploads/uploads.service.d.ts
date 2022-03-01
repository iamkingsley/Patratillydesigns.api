import { Attachment } from './../common/entities/attachment.entity';
import { Model } from 'mongoose';
export declare class UploadsService {
    private attachmentRepository;
    constructor(attachmentRepository: Model<Attachment>);
    create(input: any): Promise<Attachment>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, any, Attachment> & Attachment & {
        _id: string;
    }>;
    remove(id: number): string;
}
