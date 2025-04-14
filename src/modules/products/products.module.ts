import { Module } from '@nestjs/common';
import { CategoriesController } from './crontrollers/categories.controller';
import { ProductsController } from './crontrollers/products.controller';
import { ProductsService } from './services/products.service';
import { CategoryService } from './services/category.service';
import { BrandService } from './services/brand.service';
import { BrandsController } from 'src/modules/products/crontrollers/brands.controller';

@Module({
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, CategoryService, BrandService],
    exports: [ProductsService],
})
export class ProductsModule {}
