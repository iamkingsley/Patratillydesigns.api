import { TagsModule } from './../tags/tags.module';
import { CategoriesModule } from './../categories/categories.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ProductsController,
  PopularProductsController,
} from './products.controller';
import { productsProviders } from './database/products.providers';

@Module({
  imports: [
    DatabaseModule,
    CategoriesModule,
    TagsModule
  ],
  controllers: [ProductsController, PopularProductsController],
  providers: [
    ProductsService,
    ...productsProviders,
  ],
})
export class ProductsModule {}
