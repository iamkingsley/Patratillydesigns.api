/// <reference types="mongoose" />
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { GetTagsDto, TagPaginator } from './dto/get-tags.dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): Promise<import("mongoose").Document<unknown, any, import("./entities/tag.entity").Tag> & import("./entities/tag.entity").Tag & {
        _id: string;
    }>;
    findAll(query: GetTagsDto): Promise<TagPaginator>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, any, import("./entities/tag.entity").Tag> & import("./entities/tag.entity").Tag & {
        _id: string;
    }>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<any>;
    remove(id: string): Promise<any>;
}
