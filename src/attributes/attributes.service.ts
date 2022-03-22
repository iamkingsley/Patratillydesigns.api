import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';
import { Model } from 'mongoose';
import { ATTRIBUTE_MODEL } from 'src/common/constants';
import slugify from 'slugify';
import { slugOptions } from 'src/common/utils/slug-options';

@Injectable()
export class AttributesService {
  constructor(@Inject(ATTRIBUTE_MODEL) private attributeRepository: Model<Attribute>) {}
  async create(createAttributeDto: CreateAttributeDto) {    
    const attr = {
      id: v4(),
      ...createAttributeDto,
      slug: slugify(createAttributeDto.name, slugOptions),
      created_at: new Date(),
      updated_at: new Date(),
    } 
    const attribute = new this.attributeRepository(attr);
    return await attribute.save();
  }

  async findAll() {
    return await this.attributeRepository.find().exec();
  }

  async findOne(id: string) {
    return await this.attributeRepository.findOne({id}).exec();
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<any> {
    return this.attributeRepository.updateOne({id}, {
      ...updateAttributeDto,
      updated_at: Date(),
      slug: slugify(updateAttributeDto.name, slugOptions),
    }).exec();
  }

  remove(id: string) {
    return this.attributeRepository.remove({id}).exec();
  }
}
