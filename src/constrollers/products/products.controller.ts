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
import { CreateProductDTO, UpdateProductDTO } from 'src/dtos/product.dto';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {}

    @Get('/filter')
    getProductFilter() {
        return `Yo soy un filter`;
    }

    @Get('/:productId')
    @HttpCode(HttpStatus.ACCEPTED)
    getProduct(@Param('productId', ParseIntPipe) productId: number) {
        //return `product ${productId}`;
        // +productId  => lo pasa a entero
        return this.productsService.findOne(productId);
    }

    @Get('')
    getProducts(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brand: string,
    ) {
        // return `products limit=> ${limit}  offset=> ${offset}   brand=> ${brand}`;
        return this.productsService.findAll();
    }

    @Post()
    create(@Body() payload: CreateProductDTO) {
        // return {
        //     message: 'accion de crear',
        //     payload,
        // };
        return this.productsService.create(payload);
    }

    @Post('create2')
    postProducto(@Res() res: Response, @Body() payload: any) {
        // res.status(HttpStatus.CREATED).send({
        //     msg: 'Add a new product',
        //     payload
        // });
        res.status(HttpStatus.CREATED).send(
            this.productsService.create(payload),
        );
    }

    @Put(':idProduct')
    updateProducto(
        @Param('idProduct', ParseIntLPipe) idProduct: number,
        @Body() body: UpdateProductDTO,
    ): any {
        // return {
        //     idProduct: idProduct,
        //     name: body.newName,
        //     price: body.newPrice
        // };
        return this.productsService.update(idProduct, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntLPipe) id: number) {
        return this.productsService.remove(id);
    }
}
