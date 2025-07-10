import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from 'src/modules/users/dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

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

    async create(payload: CreateUserDTO) {
       const newUser = new this.userModel(payload);
       newUser.password = await bcrypt.hash(newUser.password, 10);
       const model = await newUser.save();
       const { password, ...rta } = model.toJSON();
       return rta;
    }

    update(id: string, payload: UpdateUserDTO) {
        return this.userModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec();
    }

    remove(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }

    findByEmail(email: string) {
        return this.userModel.findOne({ email}).exec();
    }
}
