import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './crontrollers/categories.controller';
import { ProductsController } from './crontrollers/products.controller';
import { BrandsController } from 'src/modules/products/crontrollers/brands.controller';
import { ProductsService } from './services/products.service';
import { CategoryService } from './services/category.service';
import { BrandService } from './services/brand.service';
import { Product } from 'src/modules/products/entities/product.entity';
import { Category } from 'src/modules/products/entities/category.entity';
import { Brand } from 'src/modules/products/entities/brand.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, CategoryService, BrandService],
    exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
