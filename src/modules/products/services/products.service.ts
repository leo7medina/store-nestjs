import { Injectable, NotFoundException } from '@nestjs/common';
import {
    CreateProductDTO,
    FilterProductsDTO,
    UpdateProductDTO,
} from 'src/modules/products/dtos/product.dto';
import { Product } from 'src/modules/products/entities/product.entity';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/modules/products/entities/brand.entity';
import { Category } from 'src/modules/products/entities/category.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Brand) private brandRepo: Repository<Brand>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
    ) {}

    findAll(params?: FilterProductsDTO) {
        if (params) {
            const where: FindOptionsWhere<Product> = {};
            // where.status = true;
            const { limit, offset, maxPrice, minPrice } = params;
            if (minPrice && maxPrice) {
                where.price = Between(minPrice, maxPrice);
            }
            return this.productRepository.find({
                relations: ['brand'],
                where,
                take: limit,
                skip: offset,
            });
        }
        return this.productRepository.find({
            // where: { status: true },
            relations: ['brand'],
        });
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['brand', 'categories'],
        });
        if (!product) {
            throw new NotFoundException(`Product #${id} not found.`);
        }
        return product;
    }

    async create(payload: CreateProductDTO) {
        const newProduct = this.productRepository.create(payload);
        if (payload.brandId) {
            const brand = await this.brandRepo.findOne({
                where: { id: payload.brandId },
            });
            if (brand) {
                newProduct.brand = brand;
            }
        }
        if (payload.categoriesIds) {
            newProduct.categories = await this.categoryRepo.findBy({
                id: In(payload.categoriesIds),
            });
        }
        return this.productRepository.save(newProduct);
    }

    async update(id: number, payload: UpdateProductDTO) {
        const product = await this.findOne(id);
        if (product) {
            if (payload.brandId && product.brand.id !== payload.brandId) {
                const brand = await this.brandRepo.findOne({
                    where: { id: payload.brandId },
                });
                if (brand) {
                    product.brand = brand;
                }
            }
            if (payload.categoriesIds) {
                product.categories = await this.categoryRepo.findBy({
                    id: In(payload.categoriesIds),
                });
            }
            this.productRepository.merge(product, payload);
            return this.productRepository.save(product);
        }
        return null;
    }

    async addCategoryToProduct(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['categories'],
        });
        if (!product) {
            throw new NotFoundException(`Product #${productId} not found.`);
        }
        const category = await this.categoryRepo.findOne({
            where: { id: categoryId },
        });
        if (category) {
            product.categories.push(category);
        }
        return this.productRepository.save(product);
    }

    async removeCategoryByProduct(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['categories'],
        });
        if (!product) {
            throw new NotFoundException(`Product #${productId} not found.`);
        }
        product.categories = product.categories.filter(
            (item) => item.id !== categoryId,
        );
        return this.productRepository.save(product);
    }

    remove(id: number) {
        return this.productRepository.delete(id);
    }
}
