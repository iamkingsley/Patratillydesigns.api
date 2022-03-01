/// <reference types="mongoose" />
import { ShippingsService } from './shippings.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { GetShippingsDto } from './dto/get-shippings.dto';
export declare class ShippingsController {
    private readonly shippingsService;
    constructor(shippingsService: ShippingsService);
    create(createShippingDto: CreateShippingDto): Promise<import("mongoose").Document<unknown, any, import("./entities/shipping.entity").Shipping> & import("./entities/shipping.entity").Shipping & {
        _id: string;
    }>;
    findAll(query: GetShippingsDto): Promise<(import("mongoose").Document<unknown, any, import("./entities/shipping.entity").Shipping> & import("./entities/shipping.entity").Shipping & {
        _id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, any, import("./entities/shipping.entity").Shipping> & import("./entities/shipping.entity").Shipping & {
        _id: string;
    }>;
    update(id: string, updateShippingDto: UpdateShippingDto): Promise<import("mongoose").Document<unknown, any, import("./entities/shipping.entity").Shipping> & import("./entities/shipping.entity").Shipping & {
        _id: string;
    }>;
    remove(id: string): Promise<any>;
}
