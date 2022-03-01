/// <reference types="mongoose" />
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    createAddress(createAddressDto: CreateAddressDto): Promise<import("mongoose").Document<unknown, any, import("./entities/address.entity").Address> & import("./entities/address.entity").Address & {
        _id: string;
    }>;
    updateAddress(id: string, updateAddressDto: UpdateAddressDto): Promise<any>;
    deleteAddress(id: string): Promise<any>;
}
