import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { CustomerService } from 'src/modules/users/services/customer.service';
import {
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from 'src/modules/users/dtos/customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    findAll() {
        return this.customerService.findAll();
    }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.customerService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateCustomerDTO) {
        return this.customerService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateCustomerDTO,
    ) {
        return this.customerService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.customerService.remove(id);
    }
}
