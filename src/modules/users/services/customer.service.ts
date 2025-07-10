import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/modules/users/entities/customer.entity';
import {
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from 'src/modules/users/dtos/customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {

    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>
    ) {}

    findAll() {
        return this.customerModel.find().exec();
    }

    async findOne(id: string) {
        const customer = await this.customerModel.findById(id).exec();
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found.`);
        }
        return customer;
    }

    create(payload: CreateCustomerDTO) {
        const newCustomer = new this.customerModel(payload);
        return newCustomer.save();
    }

    update(id: string, payload: UpdateCustomerDTO) {
        return this.customerModel.findByIdAndUpdate(id, { $set: payload}, { new: true}).exec();
    }

    remove(id: string) {
       return this.customerModel.findByIdAndDelete(id);
    }
}
