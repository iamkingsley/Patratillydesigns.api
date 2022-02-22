import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';
import mongoose, { Model } from 'mongoose';
import { ATTRIBUTE_MODEL } from 'src/common/constants';

@Injectable()
export class AttributesService {
  constructor(@Inject(ATTRIBUTE_MODEL) private attributeRepository: Model<Attribute>) {}
  async create(createAttributeDto: CreateAttributeDto) {
    
     const { values } = createAttributeDto
    const attr = {
      id: v4(),
      ...createAttributeDto,
      created_at: new Date(),
      updated_at: new Date(),
    } 
    const attribute = new this.attributeRepository(attr);
    return await attribute.save();
  }

  findAll() {
    return this.attributeRepository.find().exec();
  }

  async findOne(id: string) {
    const attr = await this.attributeRepository.findOne({id}).exec();
    console.log("attr: ", attr);
    return attr;
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<any> {
    return this.attributeRepository.updateOne({id}, {...updateAttributeDto}).exec();
  }

  remove(id: string) {
    return this.attributeRepository.remove({id}).exec();
  }
}
