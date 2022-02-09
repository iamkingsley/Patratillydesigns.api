import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import Fuse from 'fuse.js';
import categoriesJson from '@db/categories.json';
import { paginate } from 'src/common/pagination/paginate';
import { Model } from 'mongoose';
import { CATEGORY_MODEL } from 'src/common/constants';
import { v4 } from "uuid";
const categories = plainToClass(Category, categoriesJson);
const options = {
  keys: ['name', 'type.slug'],
  threshold: 0.3,
};
const fuse = new Fuse(categories, options);
@Injectable()
export class CategoriesService {
  private categories: Category[] = categories;
  /**
   *
   */
  constructor(@Inject(CATEGORY_MODEL)
    private categoriesRepository: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const cat = {
      id: v4(),
      ...createCategoryDto,
      created_at: new Date(),
      updated_at: new Date,
    }
    const category = new this.categoriesRepository(cat)
   return await category.save();
  }

  async getCategories({ limit, page, search, parent }: GetCategoriesDto) {
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Category[] = await this.categoriesRepository.find().exec();
    // let data: Category[] = this.categories;
    // console.log("cat data ",data);
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // data = data.filter((item) => item[key] === value);
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }
    // Disabled for Admin to work
    // if (parent === 'null') {
    //   data = data.filter((item) => item.parent === null);
    // }
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // if (hasType) {
    //   data = fuse.search(hasType)?.map(({ item }) => item);
    // }

    const results = data.slice(startIndex, endIndex);
    const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;
    // console.log("results: ", results);
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getCategory(id: string) {
    // return this.categories.find((p) => p.id === id);
    const category = await this.categoriesRepository
    .findOne({id})
    // .where("id").equals(id)
    .exec();
    console.log("getCategory: ", category);
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any> {
     return this.categoriesRepository.updateOne({ id } , {...updateCategoryDto}).exec();
  }

  remove(id: string) {
   return this.categoriesRepository.remove({ id }).exec();
  }
}
