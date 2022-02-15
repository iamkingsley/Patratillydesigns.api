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
    const categoryDoc = await this.categoriesRepository.findOne({ slug }).exec();
    if (
      updateCategoryDto?.parent_id &&
      updateCategoryDto?.parent_id !== categoryDoc.parent_id
    ) {
      // remove child from it's original parent
      const originalParentDoc = await this.categoriesRepository
      .findOne({ id: categoryDoc.parent_id})
      .populate('children')
      .exec()
      originalParentDoc.children.map((cat, i) => {
        if (cat.slug === categoryDoc.slug) {
          originalParentDoc.children.splice(i)
        }
      });
      originalParentDoc.save();
      
      const newParentDoc
        = await this.categoriesRepository.findOne({ id: updateCategoryDto.parent_id}).exec();
      
        // update child also
      categoryDoc.parent = newParentDoc;
      categoryDoc.parent_id = newParentDoc.id;
      categoryDoc.type_id = updateCategoryDto.type_id;
      categoryDoc.name = updateCategoryDto.name;
      categoryDoc.icon = updateCategoryDto.icon;
      
      categoryDoc.save()

      // assign child a new parent
      newParentDoc.children.push(categoryDoc);
      newParentDoc.save();
      
      return categoryDoc;
    } else {
      return this.categoriesRepository.updateOne(
        { slug },
        {
          ...updateCategoryDto,
          updated_at: Date()
        }
      ).exec();
    }
  }

  async remove(slug: string): Promise<any> {
    const categoryDoc = await this.categoriesRepository.findOne({ slug }).exec();
    // if it has a parent
    if (categoryDoc?.parent_id) {
      // find the parent
      const parentCatDoc =
        await this.categoriesRepository
          .findOne({ id: categoryDoc.parent_id })
          .populate('children')
          .exec();
      // remove category from its parent
      parentCatDoc.children.map((cat, i) => {
        if (cat.slug === categoryDoc.slug) {
          parentCatDoc.children.splice(i)
        }
      });
      parentCatDoc.save();
    }
    // now delete category
    return this.categoriesRepository.deleteOne({ slug }).exec();
  }
}
