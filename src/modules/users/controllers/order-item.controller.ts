import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from 'src/modules/users/dtos/order-item.dto';
import { OrderItemService } from 'src/modules/users/services/order-item.service';

@Controller('order-details')
export class OrderItemController {
    constructor(private itemsService: OrderItemService) {}

    @Post()
    create(@Body() payload: CreateOrderItemDTO) {
        return this.itemsService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateOrderItemDTO,
    ) {
        return this.itemsService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.remove(+id);
    }
}
