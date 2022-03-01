import mongoose from 'mongoose';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Model<Category>);
    create(createCategoryDto: any): Promise<mongoose.Document<unknown, any, Category> & Category & {
        _id: string;
    }>;
    getCategories({ limit, page, search, parent }: GetCategoriesDto): Promise<{
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
        data: Category[];
    }>;
    getCategory(slug: string): Promise<mongoose.Document<unknown, any, Category> & Category & {
        _id: string;
    }>;
    update(slug: string, updateCategoryDto: UpdateCategoryDto): Promise<any>;
    remove(slug: string): Promise<any>;
}
