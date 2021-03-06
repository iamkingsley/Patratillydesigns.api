import { PaginationArgs } from './../common/dto/pagination-args.dto';
import { TAG_MODEL, CATEGORY_MODEL } from './../common/constants';
import { v4 } from 'uuid';
import slugify from 'slugify';
import mongoose from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { paginate } from 'src/common/pagination/paginate';
import Fuse from 'fuse.js';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { Model } from 'mongoose';
import { PRODUCT_MODEL } from 'src/common/constants';
import { slugOptions } from 'src/common/utils/slug-options';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';

const options = {
  keys: ['name', /*'type.slug'*/, 'categories.slug', 'status', 'shop_id'],
  threshold: 0.3,
};
@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_MODEL) private productModel: Model<Product>,
    @Inject(CATEGORY_MODEL) private categoryModel: Model<Category>,
    @Inject(TAG_MODEL) private tagModel: Model<Tag>,
  ) {}
  
  async create(createProductDto: CreateProductDto) {
    const { name, categories, tags, image, gallery } = createProductDto;
    const prod = {
      id: v4(),
      ...createProductDto,
      image: {
        ...image,
        _id: new mongoose.Types.ObjectId(image._id)
      },
      gallery: gallery.map((img) => {
        return {
          ...img,
          _id: new mongoose.Types.ObjectId(img._id)
        }
      }),
      slug: slugify(name, slugOptions),
      created_at: new Date(),
      updated_at: new Date()
    }
    
    const product = new this.productModel(prod);
    const prodDoc = await product.save()
    // push selected categories
    for(const _id of categories) {
      // find and update each category with the product info
      const category = await this.categoryModel.findById(new mongoose.Types.ObjectId(_id));
      category.products.push(product)
      await category.save();
      // now push it
      prodDoc.categories.push(category)
    }
    // push selected tags
    if (tags) {
      for(const _id of tags) {
        // find and update each tag with the product info
        const tag = await this.tagModel.findById(new mongoose.Types.ObjectId(_id));
        tag.products.push(product)
        await tag.save();
        // now push it
        prodDoc.tags.push(tag);
      }
    }

    return prodDoc.save();
  }

  async getProducts({ limit, page, search, orderBy, sortedBy }: GetProductsDto): Promise<ProductPaginator> {
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let data = await this.productModel.find({ status: "publish" })
      .populate('tags')
      .populate('categories')
      .populate('image')
      .populate('gallery')
      .populate('variations')
      .populate('variation_options')
      .limit(limit)
      .sort({ [orderBy]: sortedBy })
      .exec();
    const fuse = new Fuse(data, options);

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        if (key === 'color' || key === 'size') {
          data = data.filter((product) => product.variation_options
          .find((vo) => vo.options.some((o) => o.value === value)))
        } else {
          data = fuse.search(value)?.map(({ item }) => item);
        }
      }
    }
    
    const results = data.slice(startIndex, endIndex);
    const url = `/products?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getProductBySlug(slug: string): Promise<any> {
    const products = await this.productModel
      .find()
      .populate('tags')
      .populate('categories')
      .populate('image')
      .populate('gallery')
      .populate('variations')
      .populate('variation_options')
      .exec();

    const product = products.find((p) => p?.slug === slug);
    const related_products = products
      .filter((p) => p?.type?.slug === product?.type?.slug)
      .slice(0, 20);
      
    return {
      ...product,
      related_products,
    };
  }

  async getPopularProducts({ shop_id, limit }: GetPopularProductsDto): Promise<Product[]> {
    return await this.productModel
    .find()
    .populate('image')
    .limit(limit)
    .exec();
  }

  async getFeaturedProducts({ limit }: PaginationArgs): Promise<Product[]> {
    return await this.productModel
      .find({ is_featured: true })
      .populate('tags')
      .populate('categories')
      .populate('image')
      .populate('gallery')
      .populate('variations')
      .populate('variation_options')
      .limit(limit)
      .exec();
  }
  
  async update(id: string, updateProductDto: UpdateProductDto): Promise<any> {
    const {name, image, gallery } = updateProductDto;
    return this.productModel.updateOne(
      { slug: id },
      {
        ...updateProductDto,
        image: image ? {
          ...image,
          _id: new mongoose.Types.ObjectId(image._id)
        }: undefined,
        gallery: gallery ? gallery.map((img) => {
          return {
            ...img,
            _id: new mongoose.Types.ObjectId(img._id)
          }
        }): undefined,
        slug: slugify(name, slugOptions),
        updated_at: Date()
      }
    ).exec();
  }

  async remove(id: string): Promise<any> {
    return this.productModel.deleteOne({ id }).exec();
  }
}
