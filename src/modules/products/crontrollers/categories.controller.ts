import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CategoryService } from 'src/modules/products/services/category.service';
import {
    CreateCategoryDTO,
    UpdateCategoryDTO,
} from 'src/modules/products/dtos/category.dto';
import { MongoIdPipe } from 'src/commons/pipes/mongo-id.pipe';

@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    get(@Param('id', MongoIdPipe) id: string) {
        return this.categoryService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateCategoryDTO) {
        return this.categoryService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCategoryDTO,
    ) {
        return this.categoryService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.categoryService.remove(id);
    }
}
