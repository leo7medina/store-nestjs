import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CustomerService } from 'src/modules/users/services/customer.service';
import {
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from 'src/modules/users/dtos/customer.dto';
import { MongoIdPipe } from 'src/commons/pipes/mongo-id.pipe';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    findAll() {
        return this.customerService.findAll();
    }

    @Get(':id')
    get(@Param('id', MongoIdPipe) id: string) {
        return this.customerService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateCustomerDTO) {
        return this.customerService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCustomerDTO,
    ) {
        return this.customerService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.customerService.remove(id);
    }
}
