import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/modules/products/entities/category.entity';
import {
    CreateCategoryDTO,
    UpdateCategoryDTO,
} from 'src/modules/products/dtos/category.dto';

@Injectable()
export class CategoryService {
    private counterId = 1;
    private categories: Category[] = [
        {
            id: 1,
            name: 'Category 1',
        },
    ];

    findAll() {
        return this.categories;
    }

    findOne(id: number) {
        const category = this.categories.find((item) => item.id === id);
        if (!category) {
            throw new NotFoundException(`Category #${id} not found.`);
        }
        return category;
    }

    create(payload: CreateCategoryDTO) {
        this.counterId += 1;
        const newCategory: Category = {
            id: this.counterId,
            ...payload,
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    update(id: number, payload: UpdateCategoryDTO) {
        const category = this.findOne(id);
        if (category) {
            const index = this.categories.findIndex((item) => item.id === id);
            this.categories[index] = {
                ...category,
                ...payload,
            };
            return this.categories[index];
        }
        return null;
    }

    remove(id: number) {
        const index = this.categories.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Category #${id} not found.`);
        }
        this.categories.splice(index, 1);
        return true;
    }
}
