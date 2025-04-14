import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from 'src/modules/users/dtos/user.dto';

@Injectable()
export class UserService {
    private counterId = 1;
    private users: User[] = [
        {
            id: 1,
            email: 'correo@gmail.com',
            password: '12345',
            role: 'admin',
        },
    ];

    findAll() {
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find((item) => item.id === id);
        if (!user) {
            throw new NotFoundException(`User #${id} not found.`);
        }
        return user;
    }

    create(payload: CreateUserDTO) {
        this.counterId += 1;
        const newUser: User = {
            id: this.counterId,
            ...payload,
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, payload: UpdateUserDTO) {
        const user = this.findOne(id);
        if (user) {
            const index = this.users.findIndex((item) => item.id === id);
            this.users[index] = {
                ...user,
                ...payload,
            };
            return this.users[index];
        }
        return null;
    }

    remove(id: number) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`User #${id} not found.`);
        }
        this.users.splice(index, 1);
        return true;
    }
}
