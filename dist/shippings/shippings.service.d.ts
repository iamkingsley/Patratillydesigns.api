import { Model } from 'mongoose';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { GetShippingsDto } from './dto/get-shippings.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { Shipping } from './entities/shipping.entity';
export declare class ShippingsService {
    private shippingRepository;
    constructor(shippingRepository: Model<Shipping>);
    private shippings;
    create(createShippingDto: CreateShippingDto): Promise<import("mongoose").Document<unknown, any, Shipping> & Shipping & {
        _id: string;
    }>;
    getShippings({}: GetShippingsDto): Promise<(import("mongoose").Document<unknown, any, Shipping> & Shipping & {
        _id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, any, Shipping> & Shipping & {
        _id: string;
    }>;
    update(id: string, updateShippingDto: UpdateShippingDto): Promise<import("mongoose").Document<unknown, any, Shipping> & Shipping & {
        _id: string;
    }>;
    remove(id: string): Promise<any>;
}
