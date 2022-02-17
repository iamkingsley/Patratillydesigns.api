import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { SHIPPING_MODEL } from 'src/common/constants';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { GetShippingsDto } from './dto/get-shippings.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { Shipping } from './entities/shipping.entity';
import shippingsJson from './shippings.json';
const shippings = plainToClass(Shipping, shippingsJson);
@Injectable()
export class ShippingsService {
  constructor(@Inject(SHIPPING_MODEL) private shippingRepository: Model<Shipping>) {}
  private shippings: Shipping[] = shippings;

  create(createShippingDto: CreateShippingDto) {
    const shipping ={
      id: v4(),
      ...createShippingDto,
      created_at: new Date(),
      updated_at: new Date(),
    }
    return new this.shippingRepository(shipping).save()
  }

  async getShippings({}: GetShippingsDto) {
    return await this.shippingRepository.find().exec();
  }

  async findOne(id: string) {
    return await this.shippingRepository.findOne({id}).exec();
  }

  async update(id: string, updateShippingDto: UpdateShippingDto) {
    return await this.shippingRepository.findOneAndUpdate(
      {id},
      {
        ...updateShippingDto,
        updated_at: new Date()
      }).exec();
  }

  remove(id: string): Promise<any> {
    return this.shippingRepository.deleteOne({id}).exec();
  }
}
