import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from 'src/modules/products/entities/brand.entity';
import {
    CreateBrandDTO,
    UpdateBrandDTO,
} from 'src/modules/products/dtos/brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandService {

    constructor(
       @InjectModel(Brand.name) private brandModel: Model<Brand>
    ) {}

    findAll() {
        return this.brandModel.find().exec();
    }

    async findOne(id: string) {
        const brand = await this.brandModel.findOne({ _id: id }).exec();
        if (!brand) {
            throw new NotFoundException(`Brand #${id} not found`);
        }
        return brand;
    }

    create(payload: CreateBrandDTO) {
        console.log('payload brand', payload);
        const newBrand = new this.brandModel(payload);
        console.log('newBrand', newBrand);
        return newBrand.save();
    }

    async update(id: string, payload: UpdateBrandDTO) {
        const brand = await this.brandModel
            .findByIdAndUpdate(id, { $set: payload}, { new: true})
            .exec();
        if (!brand) {
            throw new NotFoundException(`Brand #${id} not found`);
        }
        return brand;
    }

    remove(id: string) {
        return this.brandModel.findByIdAndDelete(id);
    }
}
