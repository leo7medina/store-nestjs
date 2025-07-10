import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from 'src/modules/users/dtos/user.dto';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CustomerService } from 'src/modules/users/services/customer.service';

@Injectable()
export class UserService {
    constructor(
        @Inject('PG') private clientPg: Client,
        @InjectRepository(User) private userRepository: Repository<User>,
        private customerService: CustomerService,
    ) {}

    findAll() {
        return this.userRepository.find({
            relations: ['customer'],
        });
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User #${id} not found.`);
        }
        return user;
    }

    async create(payload: CreateUserDTO) {
        const newUser = this.userRepository.create(payload);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        if (payload.customerId) {
            newUser.customer = await this.customerService.findOne(
                payload.customerId,
            );
        }
        return this.userRepository.save(newUser);
    }

    async update(id: number, payload: UpdateUserDTO) {
        const user = await this.findOne(id);
        if (user) {
            this.userRepository.merge(user, payload);
            return this.userRepository.save(user);
        }
        return null;
    }

    remove(id: number) {
        return this.userRepository.delete(id);
    }

    getTasks() {
        return new Promise((resolve, reject) => {
            this.clientPg.query(`SELECT * FROM tasks`, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            });
        });
    }

    findByEmail(email: string) {
        return this.userRepository.findOne({ where: {email}})
    }
}
