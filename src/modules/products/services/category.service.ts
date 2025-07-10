import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/modules/products/entities/category.entity';
import {
    CreateCategoryDTO,
    UpdateCategoryDTO,
} from 'src/modules/products/dtos/category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {

    constructor(
       @InjectModel(Category.name) private categoryModel: Model<Category>
    ) {}

    findAll() {
        return this.categoryModel.find().exec();
    }

    async findOne(id: string) {
        const category = await this.categoryModel.findOne({_id: id}).exec();
        if (!category) {
            throw new NotFoundException(`Category #${id} not found.`);
        }
        return category;
    }

    create(payload: CreateCategoryDTO) {
        const newCategory = new this.categoryModel(payload);
        return newCategory.save();
    }

    async update(id: string, payload: UpdateCategoryDTO) {
        const category = await this.categoryModel.findByIdAndUpdate(id, { $set: payload}, { new: true}).exec();
        if (!category) {
            throw new NotFoundException(`Category #${id} not found.`);
        }
        return category;
    }

    remove(id: string) {
       return this.categoryModel.findByIdAndDelete(id);
    }
}
