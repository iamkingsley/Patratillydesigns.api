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
  
  constructor(
    @Inject(CATEGORY_MODEL) private categoriesRepository: Model<Category>,
    ) {}

  async create(createCategoryDto: any) {
    const { name, parent, image } = createCategoryDto;
    const cat = {
      id: v4(),
      ...createCategoryDto,
      image: {
        ...image,
        _id: new mongoose.Types.ObjectId(image._id)
      },
      slug: slugify(name, slugOptions),
      created_at: new Date(),
      updated_at: new Date()
    }
    
    const category = new this.categoriesRepository(cat);
    const catDoc = await category.save()

    const parentCat = await this.categoriesRepository
        .findById(new mongoose.Types.ObjectId(parent));

    catDoc.parent = parentCat;

    if (parent) {
      const parentCat = await this.categoriesRepository
        .findById(new mongoose.Types.ObjectId(parent));
      parentCat.children.push(category);
      parentCat.save();
    }
    return category.save();
  }

  async getCategories({ limit, page, search, parent, orderBy, sortedBy }: GetCategoriesDto) {
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Category[] = await this.categoriesRepository
      .find({ parent: null }) // shop navigation fix
      .populate('children')
      .populate('image')
      .limit(limit)
      .sort({ [orderBy]: sortedBy })
      .exec();

    const fuse = new Fuse(data, options);
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }

    // Disabled for Admin to work
    // if (parent === null) {
    //   data = data.filter((item) => item.parent === null);
    // }

    const results = data.slice(startIndex, endIndex);
    const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getFeaturedCategories(query: GetCategoriesDto) {
    let data: Category[] = await this.categoriesRepository
    .find({ is_featured: true })
    .populate('image')
    .sort({ created_at: -1 })
    .limit(Number(query.limit))
    .exec();
    return { data };
  }

  async getCategory(slug: string) {
    const category = await this.categoriesRepository
    .findOne({slug})
    .populate('image')
    .populate('parent')
    .exec();
    return category;
  }

  async update(slug: string, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    let categoryDoc = await this.categoriesRepository.findOne({ slug }).exec();
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
      
      // assign child to new parent
      newParentDoc.children.push(categoryDoc);
      newParentDoc.save();

      // update child also
      return this.categoriesRepository.updateOne(
        { slug },
        {
          ...updateCategoryDto,
          parent: newParentDoc,
          slug: slugify(updateCategoryDto.name, slugOptions),
          image: updateCategoryDto.image ? {
            ...updateCategoryDto.image,
            _id: new mongoose.Types.ObjectId(updateCategoryDto.image._id)
          } : undefined,
          updated_at: Date()
        }
      ).exec();
    } else {
      return this.categoriesRepository.updateOne(
        { slug },
        {
          ...updateCategoryDto,
          slug: slugify(updateCategoryDto.name, slugOptions),
          image: updateCategoryDto.image ? {
            ...updateCategoryDto.image,
            _id: new mongoose.Types.ObjectId(updateCategoryDto.image._id)
          } : undefined,
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
