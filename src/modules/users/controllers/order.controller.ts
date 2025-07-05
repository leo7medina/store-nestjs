import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OrderService } from 'src/modules/users/services/order.service';
import { CreateOrderDTO, UpdateOrderDTO } from 'src/modules/users/dtos/order.dto';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateOrderDTO) {
        return this.orderService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateOrderDTO,
    ) {
        return this.orderService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.remove(+id);
    }
}
