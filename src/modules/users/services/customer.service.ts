import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/modules/users/entities/customer.entity';
import {
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from 'src/modules/users/dtos/customer.dto';

@Injectable()
export class CustomerService {
    private counterId = 1;
    private customers: Customer[] = [
        {
            id: 1,
            name: 'Leonardo',
            lastName: 'Medina',
            phone: '11111111111',
        },
    ];

    findAll() {
        return this.customers;
    }

    findOne(id: number) {
        const customer = this.customers.find((item) => item.id === id);
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found.`);
        }
        return customer;
    }

    create(payload: CreateCustomerDTO) {
        this.counterId += 1;
        const newCustomer: Customer = {
            id: this.counterId,
            ...payload,
        };
        this.customers.push(newCustomer);
        return newCustomer;
    }

    update(id: number, payload: UpdateCustomerDTO) {
        const customer = this.findOne(id);
        if (customer) {
            const index = this.customers.findIndex((item) => item.id === id);
            this.customers[index] = {
                ...customer,
                ...payload,
            };
            return this.customers[index];
        }
        return null;
    }

    remove(id: number) {
        const index = this.customers.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Customer #${id} not found.`);
        }
        this.customers.splice(index, 1);
        return true;
    }
}
