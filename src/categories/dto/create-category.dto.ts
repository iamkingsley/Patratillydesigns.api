import { PickType } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto extends PickType(Category, [
  'name',
  'type',
  'details',
  'parent',
  'parent_id',
  'type_id',
  'icon',
  'image',
  'is_featured'
]) {}
