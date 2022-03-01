/// <reference types="mongoose" />
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { Product } from './entities/product.entity';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductDto: CreateProductDto): Promise<import("mongoose").Document<unknown, any, Product> & Product & {
        _id: string;
    }>;
    getProducts(query: GetProductsDto): Promise<ProductPaginator>;
    getFeaturedProducts(query: any): Promise<Product[]>;
    getProductBySlug(slug: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<any>;
    remove(id: string): Promise<any>;
}
export declare class PopularProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(query: GetPopularProductsDto): Promise<Product[]>;
}
