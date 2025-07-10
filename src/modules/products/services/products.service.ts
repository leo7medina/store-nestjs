import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/modules/products/entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateProductDTO, FilterProductsDTO, UpdateProductDTO } from 'src/modules/products/dtos/product.dto';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) {}

    findAll(params?: FilterProductsDTO) {
        if (params) {
            const filters: FilterQuery<Product> = {};
            const { minPrice, maxPrice } = params;
            if (minPrice && maxPrice) {
                filters.price = { $gte: minPrice, $lte: maxPrice }
            }
            return this.productModel
                .find(filters)
                .populate('brand')
                .skip(params.offset)
                .limit(params.limit)
                .exec();
        }
        return this.productModel.find().populate('brand').exec();
    }

    async findOne(id: string) {
        const product = await this.productModel.findById(id).exec()
        if (!product) {
            throw new NotFoundException(`Product #${id} not found.`);
        }
        return product;
    }

    create(payload: CreateProductDTO) {
        const newProduct = new this.productModel(payload);
        return newProduct.save();
    }

    async update(id: string, payload: UpdateProductDTO) {
       const product = await this.productModel.findByIdAndUpdate(id,
           { $set: payload },
           { new: true})
           .exec();
       if (!product) {
           throw new NotFoundException(`Product #${id} not found.`);
       }
       return product;
    }

    remove(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }
}
