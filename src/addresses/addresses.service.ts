import { v4 } from 'uuid';
import { ADDRES_MODEL } from 'src/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Model } from 'mongoose';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(@Inject(ADDRES_MODEL) private addressRepository: Model<Address>) {}

  create(createAddressDto: CreateAddressDto) {
    const _address = {
      id: v4(),
      ...createAddressDto,
      created_at: Date(),
      updated_at: Date()
    }
    const address = new this.addressRepository(_address);
    return address.save();
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: string) {
    return `This action returns a #${id} address`;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<any> {
    return this.addressRepository.updateOne(
      { id },
      {
        ...updateAddressDto,
        updated_at: Date()
      }
    ).exec()
  }

  async remove(id: string): Promise<any> {
    return this.addressRepository.deleteOne({ id }).exec();
  }
}
