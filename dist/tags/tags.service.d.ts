import mongoose, { Model } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsDto } from './dto/get-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
export declare class TagsService {
    private tagsRepository;
    constructor(tagsRepository: Model<Tag>);
    create(createTagDto: CreateTagDto): Promise<mongoose.Document<unknown, any, Tag> & Tag & {
        _id: string;
    }>;
    findAll({ page, limit }: GetTagsDto): Promise<{
        count: number;
        currentPage: number;
        firstItem: number;
        lastItem: number;
        lastPage: number;
        perPage: number;
        total: number;
        first_page_url: string;
        last_page_url: string;
        next_page_url: string;
        prev_page_url: string;
        data: (mongoose.Document<unknown, any, Tag> & Tag & {
            _id: string;
        })[];
    }>;
    findOne(id: string): Promise<mongoose.Document<unknown, any, Tag> & Tag & {
        _id: string;
    }>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<any>;
    remove(id: string): Promise<any>;
}
