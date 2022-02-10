import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TAGS_MODEL, TAGS } from 'src/common/constants';
import { paginate } from 'src/common/pagination/paginate';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsDto } from './dto/get-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  /**
   *
   */
  constructor(@Inject(TAGS_MODEL)
  private tagsRepository: Model<Tag>) {}
  private tags: Tag[] = [];

  async create(createTagDto: CreateTagDto) {
    const tag = {
      id: v4(),
      ...createTagDto,
      created_at: new Date(),
      updated_at: new Date(),
    }
    const tagCreated = new this.tagsRepository(tag);
    return await tagCreated.save();
    // return {
    //   id: this.tags.length + 1,
    //   ...createTagDto,
    // };
  }

  async findAll({ page, limit }: GetTagsDto) {
    if (!page) page = 1;
    const tags = await this.tagsRepository.find().exec();
    const url = `/tags?limit=${limit}`;
    console.log("TAGS: ",tags);
    return {
      data: tags,
      ...paginate(this.tags.length, page, limit, this.tags.length, url),
    };
  }

  async findOne(id: string) {
    return await this.tagsRepository.findOne({ id }).exec();
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<any>{
    return await this.tagsRepository.updateOne({ id },{...updateTagDto}).exec();
  }

  remove(id: string) {
    this.tagsRepository.remove({ id}).exec();
  }
}
