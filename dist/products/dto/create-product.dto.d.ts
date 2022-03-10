import { Product } from '../entities/product.entity';
declare const CreateProductDto_base: import("@nestjs/common").Type<Omit<Product, "tags" | "orders" | "id" | "created_at" | "updated_at" | "type" | "shop" | "slug" | "is_featured" | "categories" | "variation_options" | "pivot" | "related_products">>;
export declare class CreateProductDto extends CreateProductDto_base {
    categories: number[];
    tags: number[];
}
export {};
