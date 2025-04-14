import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CustomerService } from './services/customer.service';
import { CustomerController } from 'src/modules/users/controllers/customer.controller';
import { UsersController } from 'src/modules/users/controllers/users.controller';
import { ProductsModule } from 'src/modules/products/products.module';

@Module({
    imports: [ProductsModule],
    controllers: [UsersController, CustomerController],
    providers: [UserService, CustomerService],
})
export class UsersModule {}
