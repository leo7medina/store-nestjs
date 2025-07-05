import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/modules/users/entities/customer.entity';
import {
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from 'src/modules/users/dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    ) {
    }

    findAll() {
        return this.customerRepository.find();
    }

    async findOne(id: number) {
        const customer = await this.customerRepository.findOne({where: {id}});
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found.`);
        }
        return customer;
    }

    create(payload: CreateCustomerDTO) {
        const newCustomer = this.customerRepository.create(payload);
        return this.customerRepository.save(newCustomer);
    }

    async update(id: number, payload: UpdateCustomerDTO) {
        const customer = await this.findOne(id);
        if (customer) {
           this.customerRepository.merge(customer, payload);
           return this.customerRepository.save(customer);
        }
        return null;
    }

    remove(id: number) {
        return this.customerRepository.delete(id);
    }
}
