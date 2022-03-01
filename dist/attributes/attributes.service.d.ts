import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';
import mongoose, { Model } from 'mongoose';
export declare class AttributesService {
    private attributeRepository;
    constructor(attributeRepository: Model<Attribute>);
    create(createAttributeDto: CreateAttributeDto): Promise<mongoose.Document<unknown, any, Attribute> & Attribute & {
        _id: string;
    }>;
    findAll(): Promise<(mongoose.Document<unknown, any, Attribute> & Attribute & {
        _id: string;
    })[]>;
    findOne(id: string): Promise<mongoose.Document<unknown, any, Attribute> & Attribute & {
        _id: string;
    }>;
    update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<any>;
    remove(id: string): Promise<any>;
}
