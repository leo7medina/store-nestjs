import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CustomerService } from './services/customer.service';
import { CustomerController } from 'src/modules/users/controllers/customer.controller';
import { UsersController } from 'src/modules/users/controllers/users.controller';
import { ProductsModule } from 'src/modules/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/modules/users/entities/customer.entity';
import { User, UserSchema } from 'src/modules/users/entities/user.entity';
import { Order, OrderSchema } from 'src/modules/users/entities/order.entity';

@Module({
    imports: [
        ProductsModule,
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema },
            { name: User.name, schema: UserSchema },
            { name: Order.name, schema: OrderSchema },
        ])
    ],
    controllers: [UsersController, CustomerController],
    providers: [UserService, CustomerService],
    exports: [UserService]
})
export class UsersModule {}
