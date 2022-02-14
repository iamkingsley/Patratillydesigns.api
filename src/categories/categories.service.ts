import { Inject, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { v4 } from "uuid";
import Fuse from 'fuse.js';
import slugify from 'slugify'
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { paginate } from 'src/common/pagination/paginate';
import { Model } from 'mongoose';
import { CATEGORY_MODEL } from 'src/common/constants';
import { slugOptions } from 'src/common/utils/slug-options';
const options = {
  keys: ['name', 'type.slug'],
  threshold: 0.3,
};
@Injectable()
export class CategoriesService {

  constructor(@Inject(CATEGORY_MODEL)
    private categoriesRepository: Model<Category>) {}

  async create(createCategoryDto: any) {
    const { name, parent } = createCategoryDto;
    const cat = {
      id: v4(),
      ...createCategoryDto,
      slug: slugify(name, slugOptions),
      created_at: new Date(),
      updated_at: new Date()
    }
    
    // console.log('categories/create: ', createCategoryDto)

    const category = new this.categoriesRepository(cat);

    const parentCat = await this.categoriesRepository
        .findById(new mongoose.Types.ObjectId(parent));

    const catDoc = await category.save()
    catDoc.parent = parentCat;

    if (parent) {
      const parentCat = await this.categoriesRepository
        .findById(new mongoose.Types.ObjectId(parent));
      parentCat.children.push(category);
      parentCat.save();
    }
    return category.save();
  }

  async getCategories({ limit, page, search, parent }: GetCategoriesDto) {
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Category[] = await this.categoriesRepository
      .find({ parent: null }) // shop navigation fix
      .populate('children').exec();

    const fuse = new Fuse(data, options);
    /*
      this makes the SHOP categories empty
    
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // data = data.filter((item) => item[key] === value);
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }
    */

    // Disabled for Admin to work
    if (parent === null) {
      data = data.filter((item) => item.parent === null);
    }
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // if (hasType) {
    //   data = fuse.search(hasType)?.map(({ item }) => item);
    // }

    const results = data.slice(startIndex, endIndex);
    const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getCategory(slug: string) {
    const category = await this.categoriesRepository
    .findOne({slug}).populate('parent').exec();
    return category;
  }

  async update(slug: string, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    return this.categoriesRepository.updateOne(
      { slug },
      {
        ...updateCategoryDto,
        updated_at: Date()
      }
    ).exec();
  }

  async remove(slug: string): Promise<any> {
    return this.categoriesRepository.deleteOne({ slug }).exec();
  }
}
