import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/modules/users/entities/order.entity';
import { Model } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from 'src/modules/users/dtos/user.dto';
import { CreateOrderDTO, UpdateOrderDTO } from 'src/modules/users/dtos/order.dto';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>
    ) {}

    findAll() {
        return this.orderModel.find().exec();
    }

    async findOne(id: string) {
        const order = await this.orderModel.findById(id);
        if (!order) {
            throw new NotFoundException(`Order #${id} not found.`);
        }
        return order;
    }

    create(payload: CreateOrderDTO) {
        const newOrder = new this.orderModel(payload);
        return newOrder.save();
    }

    update(id: string, payload: UpdateOrderDTO) {
        return this.orderModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec();
    }

    remove(id: string) {
        return this.orderModel.findByIdAndDelete(id);
    }

    async addProducts(id: string, productsId: string[]) {
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new NotFoundException(`Order #${id} not found.`);
        }
        productsId.forEach(item => order?.products.push(item));
        return order.save();
    }

    async removeProduct(id: string, productId: string) {
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new NotFoundException(`Order #${id} not found.`);
        }
        order.products.pull(productId);
        return order.save();
    }
}
