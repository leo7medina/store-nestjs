import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { UserService } from 'src/modules/users/services/user.service';
import { CreateUserDTO, UpdateUserDTO } from 'src/modules/users/dtos/user.dto';
import { MongoIdPipe } from 'src/commons/pipes/mongo-id.pipe';

@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    get(@Param('id', MongoIdPipe) id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateUserDTO) {
        return this.userService.create(payload);
    }

    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateUserDTO,
    ) {
        return this.userService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.userService.remove(id);
    }
}
