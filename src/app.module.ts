import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './constrollers/products/products.controller';
import { CategoriesController } from './constrollers/categories/categories.controller';
import { OrdersController } from './constrollers/orders/orders.controller';
import { UsersController } from './constrollers/users/users.controller';
import { BrandsController } from './constrollers/brands/brands.controller';
import { CustomerController } from './constrollers/customer/customer.controller';
import { ProductsService } from './services/products.service';

@Module({
    imports: [],
    controllers: [
        AppController,
        ProductsController,
        CategoriesController,
        OrdersController,
        UsersController,
        BrandsController,
        CustomerController,
    ],
    providers: [AppService, ProductsService],
})
export class AppModule {}
