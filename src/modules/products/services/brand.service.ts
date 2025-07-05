import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from 'src/modules/products/entities/brand.entity';
import {
    CreateBrandDTO,
    UpdateBrandDTO,
} from 'src/modules/products/dtos/brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    ) {}

    findAll() {
        return this.brandRepository.find();
    }

    async findOne(id: number): Promise<Brand> {
        const brand = await this.brandRepository.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!brand) {
            throw new NotFoundException(`Brand #${id} not found.`);
        }
        return brand;
    }

    create(payload: CreateBrandDTO) {
        const newBrand = this.brandRepository.create(payload);
        return this.brandRepository.save(newBrand);
    }

    async update(id: number, payload: UpdateBrandDTO) {
        const brand = await this.findOne(id);
        if (brand) {
            this.brandRepository.merge(brand, payload);
            return this.brandRepository.save(brand);
        }
        return null;
    }

    remove(id: number) {
        return this.brandRepository.delete(id);
    }
}
