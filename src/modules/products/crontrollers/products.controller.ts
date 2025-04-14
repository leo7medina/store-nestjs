import {
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Body,
    Delete,
    HttpCode,
    HttpStatus,
    Res,
    ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ParseIntLPipe } from 'src/commons/parse-int-l/parse-int-l.pipe';
import {
    CreateProductDTO,
    UpdateProductDTO,
} from 'src/modules/products/dtos/product.dto';
import { ProductsService } from 'src/modules/products/services/products.service';
import {
    ApiCreatedResponse,
    ApiForbiddenResponse, ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Product } from 'src/modules/products/entities/product.entity';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('/:productId')
    @HttpCode(HttpStatus.ACCEPTED)
    getProduct(@Param('productId', ParseIntPipe) productId: number) {
        return this.productsService.findOne(productId);
    }

    @Get('')
    getProducts(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brandd: string,
    ) {
        return this.productsService.findAll();
    }

    @ApiOperation({ summary: 'Create product' })
    @ApiCreatedResponse({
        description: 'The product has been successfully created.',
        type: Product,
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Post()
    create(@Body() payload: CreateProductDTO) {
        return this.productsService.create(payload);
    }

    @ApiResponse({
        status: 201,
        description: 'The product has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post('create2')
    createTwo(@Res() res: Response, @Body() payload: CreateProductDTO) {
        res.status(HttpStatus.CREATED).send(
            this.productsService.create(payload),
        );
    }

    @Put(':idProduct')
    update(
        @Param('idProduct', ParseIntLPipe) idProduct: number,
        @Body() body: UpdateProductDTO,
    ): any {
        return this.productsService.update(idProduct, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntLPipe) id: number) {
        return this.productsService.remove(id);
    }
}
