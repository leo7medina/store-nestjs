import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/modules/products/products.module';

import { CustomerController } from 'src/modules/users/controllers/customer.controller';
import { UsersController } from 'src/modules/users/controllers/users.controller';
import { OrderController } from './controllers/order.controller';
import { OrderItemController } from './controllers/order-item.controller';

import { UserService } from './services/user.service';
import { CustomerService } from './services/customer.service';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';

import { User } from 'src/modules/users/entities/user.entity';
import { Customer } from 'src/modules/users/entities/customer.entity';
import { Order } from 'src/modules/users/entities/order.entity';
import { OrderItem } from 'src/modules/users/entities/order-item.entity';

@Module({
    imports: [
        ProductsModule,
        TypeOrmModule.forFeature([User, Customer, Order, OrderItem])
    ],
    controllers: [UsersController, CustomerController, OrderController, OrderItemController],
    providers: [UserService, CustomerService, OrderService, OrderItemService],
    exports: [UserService]
})
export class UsersModule {}
