import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/modules/products/entities/category.entity';
import {
    CreateCategoryDTO,
    UpdateCategoryDTO,
} from 'src/modules/products/dtos/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) { }


    findAll() {
        return this.categoryRepository.find();
    }

    async findOne(id: number) {
        const category = await this.categoryRepository.findOne({
            where: {id},
            relations: ['products']
        });
        if (!category) {
            throw new NotFoundException(`Category #${id} not found.`);
        }
        return category;
    }

    create(payload: CreateCategoryDTO) {
        const newCategory = this.categoryRepository.create(payload);
        return this.categoryRepository.save(newCategory);
    }

    async update(id: number, payload: UpdateCategoryDTO) {
        const category = await this.findOne(id);
        this.categoryRepository.merge(category, payload);
        return this.categoryRepository.save(category);
    }

    remove(id: number) {
       return this.categoryRepository.delete(id);
    }
}
