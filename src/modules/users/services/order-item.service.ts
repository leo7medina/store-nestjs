import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/modules/users/entities/order.entity';
import { OrderItem } from 'src/modules/users/entities/order-item.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from 'src/modules/users/dtos/order-item.dto';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
        @InjectRepository(Product) private productRepo: Repository<Product>,
    ) {}

    async create(data: CreateOrderItemDTO) {
        const order = await this.orderRepo.findOne({
            where: { id: data.orderId },
        });
        const product = await this.productRepo.findOne({
            where: { id: data.productId },
        });
        const item = new OrderItem();
        if (order) {
            item.order = order;
        }
        if (product) {
            item.product = product;
        }
        item.quantity = data.quantity;
        return this.itemRepo.save(item);
    }

    async update(id: number, changes: UpdateOrderItemDTO) {
        // const item = await this.itemRepo.findOne({ where: { id } });
        const item = await this.findById(id);
        if (changes.orderId) {
            const order = await this.orderRepo.findOne({
                where: { id: changes.orderId },
            });
            if (order) {
                item.order = order;
            }

        }
        if (changes.productId) {
            const product = await this.productRepo.findOne({
                where: { id: changes.productId },
            });
            if (product) {
                item.product = product;
            }
        }
        this.itemRepo.merge(item, changes);
        return this.itemRepo.save(item);
    }

    remove(id: number) {
        return this.itemRepo.delete(id);
    }

    private async findById(id: number) {
        const item = await this.itemRepo.findOne({ where: { id } });
        if (!item) {
            throw new NotFoundException(`Item Order #${id} not found.`);
        }
        return item;
    }
}
