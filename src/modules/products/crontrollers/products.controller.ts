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

} from '@nestjs/common';
import {
    CreateProductDTO, FilterProductsDTO,
    UpdateProductDTO,
} from 'src/modules/products/dtos/product.dto';
import { ProductsService } from 'src/modules/products/services/products.service';
import {
    ApiCreatedResponse,
    ApiForbiddenResponse, ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { Product } from 'src/modules/products/entities/product.entity';
import { MongoIdPipe } from 'src/commons/pipes/mongo-id.pipe';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('')
    @ApiOperation({ summary: 'List of products'})
    getProducts(@Query() params: FilterProductsDTO) {
        return this.productsService.findAll(params);
    }

    @Get('/:productId')
    @HttpCode(HttpStatus.ACCEPTED)
    getProduct(@Param('productId', MongoIdPipe) productId: string) {
        return this.productsService.findOne(productId);
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

    @Put(':idProduct')
    update(
        @Param('idProduct') idProduct: string,
        @Body() body: UpdateProductDTO,
    ): any {
        return this.productsService.update(idProduct, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}
