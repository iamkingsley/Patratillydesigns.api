import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import mongoose , { Model } from 'mongoose';
import slugify from 'slugify';
import { TAG_MODEL } from 'src/common/constants';
import { paginate } from 'src/common/pagination/paginate';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsDto } from './dto/get-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { slugOptions } from 'src/common/utils/slug-options';
@Injectable()
export class TagsService {

  constructor(@Inject(TAG_MODEL) private tagsRepository: Model<Tag>) {}

  async create(createTagDto: CreateTagDto) {
    // createTagDto.image = undefined;
    const { image } = createTagDto;

    const tag = {
      id: v4(),
      ...createTagDto,
      image: {
        ...image,
        _id: new mongoose.Types.ObjectId(image?._id)
      },
      slug: slugify(createTagDto.name, slugOptions),
      created_at: new Date(),
      updated_at: new Date(),
    }
    const tagCreated = new this.tagsRepository(tag);
    return await tagCreated.save();
  }

  async findAll({ page, limit }: GetTagsDto) {
    if (!page) page = 1;
    const tags = await this.tagsRepository.find().sort({ created_at: -1 }).exec();
    const url = `/tags?limit=${limit}`;
    return {
      data: tags,
      ...paginate(tags.length, page, limit, tags.length, url),
    };
  }

  async findOne(id: string) {
    return await this.tagsRepository.findOne({ id }).populate('image').exec();
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<any>{
    if (Object.keys(updateTagDto?.image).length === 0) {
      updateTagDto.image = undefined;
    }
    return await this.tagsRepository.updateOne({ id },{...updateTagDto}).exec();
  }

  remove(id: string) {
    return this.tagsRepository.remove({ id}).exec();
  }
}
