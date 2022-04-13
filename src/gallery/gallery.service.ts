import { v4 } from 'uuid';
import mongoose, { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { GALLERY_MODEL } from 'src/common/constants';
import { Gallery } from './entity/gallery.entity';

@Injectable()
export class GalleryService {
    constructor(
        @Inject(GALLERY_MODEL) private galleryRepository: Model<Gallery>,
    ) { }

    async create(createGallery) {
        const { image } = createGallery;
        const newGallery = {
            id: v4(),
            ...createGallery,
            image: {
                image,
                _id: new mongoose.Types.ObjectId(image._id)
            },
            // ...createGallery,
            // created_at: Date.now(),
            // updated_at: Date.now()
        }

        const gallery = new this.galleryRepository(newGallery);
        return await gallery.save()
    }

    async findAll() {
        const images = await this.galleryRepository.find()
            .populate('image').exec()
        return {
            data: images
        };
    }

    // async delete(id) {
    //     return await this.galleryRepository.deleteOne({id});
    // }
    async remove(id: string): Promise<any> {
        return this.galleryRepository.deleteOne({ id }).exec();
    }
}
