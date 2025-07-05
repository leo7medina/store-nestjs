import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/modules/users/entities/order.entity';
import {
    CreateOrderDTO,
    UpdateOrderDTO,
} from 'src/modules/users/dtos/order.dto';
import { Customer } from 'src/modules/users/entities/customer.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) {}

    findAll() {
        return this.orderRepository.find();
    }

    async findOne(id: number) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['items', 'items.product'],
        });
        if (!order) {
            throw new NotFoundException(`Order #${id} not found.`);
        }
        return order;
    }

    async create(payload: CreateOrderDTO) {
        const newOrder = new Order();
        if (payload.customerId) {
            const customer = await this.customerRepository.findOne({
                where: { id: payload.customerId },
            });
            if (customer) {
                newOrder.customer = customer;
            }
        }
        return this.orderRepository.save(newOrder);
    }

    async update(id: number, payload: UpdateOrderDTO) {
        const order = await this.orderRepository.findOne({
            where: { id },
        });
        if (order && payload.customerId) {
            const customer = await this.customerRepository.findOne({
                where: { id: payload.customerId },
            });
            if (customer) {
                order.customer = customer
            }
            return this.orderRepository.save(order);
        }
        return null;
    }

    remove(id: number) {
        return this.orderRepository.delete(id);
    }
}
