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
import { CategoryService } from 'src/modules/products/services/category.service';
import {
    CreateCategoryDTO,
    UpdateCategoryDTO,
} from 'src/modules/products/dtos/category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateCategoryDTO) {
        return this.categoryService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateCategoryDTO,
    ) {
        return this.categoryService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.remove(+id);
    }
}
