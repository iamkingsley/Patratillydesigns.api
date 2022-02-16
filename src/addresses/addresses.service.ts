import { v4 } from 'uuid';
import { ADDRES_MODEL } from 'src/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Model } from 'mongoose';
import { Address } from './entities/address.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AddressesService {
  constructor(
    @Inject(ADDRES_MODEL) private addressRepository: Model<Address>,
    private userService: UsersService,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const _address = {
      id: v4(),
      ...createAddressDto,
      created_at: Date(),
      updated_at: Date()
    }
    const address = new this.addressRepository(_address);
    address.save();

    const customer = await this.userService.findOneByUuid(createAddressDto.customer_id);
    customer.address.push(address);
    customer.save();

    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<any> {
    return this.addressRepository.updateOne(
      { id },
      {
        ...updateAddressDto,
        updated_at: Date()
      }
    ).exec();
  }

  async remove(id: string): Promise<any> {
    const address = await this.addressRepository.findOne({ id }).exec();
    const customer = await this.userService.findOneByUuid(address.customer_id);
    customer.address.map((add, i) => {
      if (add.id === id) {
        customer.address.splice(i)
      }
    });
    customer.save();

    return address.delete();
  }
}
