import { PaginationArgs } from './../common/dto/pagination-args.dto';
import mongoose from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { Model } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
export declare class ProductsService {
    private productModel;
    private categoryModel;
    private tagModel;
    constructor(productModel: Model<Product>, categoryModel: Model<Category>, tagModel: Model<Tag>);
    create(createProductDto: CreateProductDto): Promise<mongoose.Document<unknown, any, Product> & Product & {
        _id: string;
    }>;
    getProducts({ limit, page, search }: GetProductsDto): Promise<ProductPaginator>;
    getProductBySlug(slug: string): Promise<any>;
    getPopularProducts({ shop_id, limit }: GetPopularProductsDto): Promise<Product[]>;
    getFeaturedProducts({ limit }: PaginationArgs): Promise<Product[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<any>;
    remove(id: string): Promise<any>;
}
