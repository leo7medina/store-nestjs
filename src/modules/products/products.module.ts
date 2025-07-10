import { Module } from '@nestjs/common';
import { CategoriesController } from './crontrollers/categories.controller';
import { ProductsController } from './crontrollers/products.controller';
import { ProductsService } from './services/products.service';
import { CategoryService } from './services/category.service';
import { BrandService } from './services/brand.service';
import { BrandsController } from 'src/modules/products/crontrollers/brands.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/modules/products/entities/product.entity';
import { Brand, BrandSchema } from 'src/modules/products/entities/brand.entity';
import { Category, CategorySchema } from 'src/modules/products/entities/category.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Brand.name, schema: BrandSchema },
            { name: Category.name, schema: CategorySchema },
        ])
    ],
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, CategoryService, BrandService],
    exports: [ProductsService],
})
export class ProductsModule {}
