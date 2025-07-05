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
import { ParseIntLPipe } from 'src/common/parse-int-l/parse-int-l.pipe';
import {
    CreateProductDTO, FilterProductsDTO,
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

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('/:productId')
    @HttpCode(HttpStatus.ACCEPTED)
    getProduct(@Param('productId', ParseIntPipe) productId: number) {
        return this.productsService.findOne(productId);
    }

    @ApiOperation({ summary: 'List of products.'})
    @Get('')
    getProducts(@Query() params: FilterProductsDTO) {
        return this.productsService.findAll(params);
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
    async createTwo(@Res() res: Response, @Body() payload: CreateProductDTO) {
        const product = await this.productsService.create(payload);
        return res.status(HttpStatus.CREATED).json(product);
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

    @Put(':id/category/:categoryId')
    addCategoryToProduct(
        @Param('id', ParseIntPipe) id: number,
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ) {
        return this.productsService.addCategoryToProduct(id, categoryId);
    }

    @Delete(':id/category/:categoryId')
    deleteCategory(
        @Param('id', ParseIntPipe) id: number,
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ) {
        return this.productsService.removeCategoryByProduct(id, categoryId);
    }
}
