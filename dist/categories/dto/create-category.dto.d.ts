import { Category } from '../entities/category.entity';
declare const CreateCategoryDto_base: import("@nestjs/common").Type<Pick<Category, "type" | "name" | "details" | "image" | "icon" | "parent" | "parent_id" | "type_id">>;
export declare class CreateCategoryDto extends CreateCategoryDto_base {
}
export {};
