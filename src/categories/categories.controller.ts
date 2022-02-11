import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() query: GetCategoriesDto) {
    return this.categoriesService.getCategories(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.categoriesService.getCategory(slug);
  }

  @Put(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    console.log('update ', slug)
    return this.categoriesService.update(slug, updateCategoryDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.categoriesService.remove(slug);
  }
}
