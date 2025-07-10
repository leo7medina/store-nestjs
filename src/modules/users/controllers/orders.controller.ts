import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MongoIdPipe } from 'src/commons/pipes/mongo-id.pipe';
import { OrderService } from 'src/modules/users/services/order.service';
import { AddProductsToOrderDTO, CreateOrderDTO, UpdateOrderDTO } from 'src/modules/users/dtos/order.dto';

@Controller('orders')
export class OrdersController {

    constructor(private orderService: OrderService) {}

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    get(@Param('id', MongoIdPipe) id: string) {
        return this.orderService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateOrderDTO) {
        return this.orderService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateOrderDTO,
    ) {
        return this.orderService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.orderService.remove(id);
    }

    @Delete(':id/product/:productId')
    removeProduct(
        @Param('id') id: string,
        @Param('productId') productId: string,
    ) {
        return this.orderService.removeProduct(id, productId);
    }

    @Put(':id/products')
    updateProducts(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: AddProductsToOrderDTO,
    ) {
        return this.orderService.addProducts(id, payload.productsIds);
    }
}
