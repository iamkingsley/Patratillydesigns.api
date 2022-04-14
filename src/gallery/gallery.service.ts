import { v4 } from 'uuid';
import mongoose, { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { GALLERY_MODEL } from 'src/common/constants';
import { Gallery } from './entity/gallery.entity';
import { slugOptions } from 'src/common/utils/slug-options';
import slugify from 'slugify';

@Injectable()
export class GalleryService {
    constructor(
        @Inject(GALLERY_MODEL) private galleryRepository: Model<Gallery>,
    ) { }

    async create(createGallery) {
        const { image, description } = createGallery;
        const newGallery = {
            id: v4(),
            ...createGallery,
            image: {
                image,
                _id: new mongoose.Types.ObjectId(image._id)
            },
            slug: slugify(description, slugOptions),
            // ...createGallery,
            created_at: Date.now(),
            updated_at: Date.now()
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

    async remove(id: string): Promise<any> {
        return this.galleryRepository.deleteOne({ id }).exec();
    }

    async update(id: string, updateGallery: any): Promise<any> {
        const { image, description } = updateGallery;
        return await this.galleryRepository.updateOne(
            { slug: id },
            {
                ...updateGallery,
                image: {
                    ...image,
                    _id: new mongoose.Types.ObjectId(image._id)
                },

                slug: slugify(description, slugOptions),
                updated_at: Date()
            }

        ).exec();
    }

    async getGalleryBySlug(slug: string): Promise<any> {
        const gallery = await this.galleryRepository.findOne({ slug })
            .populate('image')
            .exec();
        return {
            data: gallery
        };
    }
}
