import { Product } from '../entities/product.entity';
declare const CreateProductDto_base: import("@nestjs/common").Type<Omit<Product, "type" | "id" | "created_at" | "updated_at" | "orders" | "slug" | "tags" | "categories" | "pivot" | "shop" | "related_products" | "is_featured" | "variation_options">>;
export declare class CreateProductDto extends CreateProductDto_base {
    categories: number[];
    tags: number[];
}
export {};
