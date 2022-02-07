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

const options = {
  keys: ['name', 'type.slug', 'categories.slug', 'status', 'shop_id'],
  threshold: 0.3,
};
@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_MODEL)
    private productModel: Model<Product>,
  ) {}
  
  create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async getProducts({ limit, page, search }: GetProductsDto): Promise<ProductPaginator> {
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data = await this.productModel.find().exec();
    console.log('getProducts: ', data)
    const fuse = new Fuse(data, options);
    
    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = fuse.search(value)?.map(({ item }) => item);
      }
    }
    // if (status) {
    //   data = fuse.search(status)?.map(({ item }) => item);
    // }
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }
    // if (hasType) {
    //   data = fuse.search(hasType)?.map(({ item }) => item);
    // }
    // if (hasCategories) {
    //   data = fuse.search(hasCategories)?.map(({ item }) => item);
    // }

    // if (shop_id) {
    //   data = this.products.filter((p) => p.shop_id === Number(shop_id));
    // }
    const results = data.slice(startIndex, endIndex);
    const url = `/products?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getProductBySlug(slug: string): Promise<any> {
    const products = await this.productModel.find().exec();
    const product = products.find((p) => p.slug === slug);
    console.log('getProductBySlug: ', product);
    const related_products = products
      .filter((p) => p.type.slug === product.type.slug)
      .slice(0, 20);
    return {
      ...product,
      related_products,
    };
  }
  async getPopularProducts({ shop_id, limit }: GetPopularProductsDto): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products?.slice(0, limit);
  }
  update(id: number, updateProductDto: UpdateProductDto): Promise<any> {
    console.log('/api/updata ',updateProductDto)
    return this.productModel.updateOne({ id }, updateProductDto).exec();
  }

  remove(id: number) {
    return this.productModel.remove({ id }).exec();
  }
}
