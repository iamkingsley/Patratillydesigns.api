import { Category } from '../entities/category.entity';
declare const CreateCategoryDto_base: import("@nestjs/common").Type<Pick<Category, "name" | "type" | "image" | "type_id" | "parent_id" | "parent" | "details" | "icon">>;
export declare class CreateCategoryDto extends CreateCategoryDto_base {
}
export {};
