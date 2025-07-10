import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { BrandService } from 'src/modules/products/services/brand.service';
import {
    CreateBrandDTO,
    UpdateBrandDTO,
} from 'src/modules/products/dtos/brand.dto';
import { MongoIdPipe } from 'src/commons/pipes/mongo-id.pipe';

@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandService) {}

    @Get()
    findAll() {
        return this.brandsService.findAll();
    }

    @Get(':id')
    get(@Param('id', MongoIdPipe) id: string) {
        return this.brandsService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateBrandDTO) {
        return this.brandsService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateBrandDTO,
    ) {
        return this.brandsService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.brandsService.remove(id);
    }
}
