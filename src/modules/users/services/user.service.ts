import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from 'src/modules/users/dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    findAll() {
        return this.userModel.find().exec();
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException(`User #${id} not found.`);
        }
        return user;
    }

    create(payload: CreateUserDTO) {
       const newUser = new this.userModel(payload);
       return newUser.save();
    }

    update(id: string, payload: UpdateUserDTO) {
        return this.userModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec();
    }

    remove(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}
