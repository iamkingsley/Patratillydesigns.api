import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Model } from 'mongoose';
import { Address } from './entities/address.entity';
import { UsersService } from 'src/users/users.service';
export declare class AddressesService {
    private addressRepository;
    private userService;
    constructor(addressRepository: Model<Address>, userService: UsersService);
    create(createAddressDto: CreateAddressDto): Promise<import("mongoose").Document<unknown, any, Address> & Address & {
        _id: string;
    }>;
    update(id: string, updateAddressDto: UpdateAddressDto): Promise<any>;
    remove(id: string): Promise<any>;
}
