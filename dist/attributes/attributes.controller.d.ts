/// <reference types="mongoose" />
import { AttributesService } from './attributes.service';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
export declare class AttributesController {
    private readonly attributesService;
    constructor(attributesService: AttributesService);
    create(input: any): Promise<import("mongoose").Document<unknown, any, import("./entities/attribute.entity").Attribute> & import("./entities/attribute.entity").Attribute & {
        _id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, any, import("./entities/attribute.entity").Attribute> & import("./entities/attribute.entity").Attribute & {
        _id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, any, import("./entities/attribute.entity").Attribute> & import("./entities/attribute.entity").Attribute & {
        _id: string;
    }>;
    update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<any>;
    remove(id: string): Promise<any>;
}
