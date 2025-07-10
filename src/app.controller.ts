import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from 'src/modules/auth/guards/api-key.guard';
import { Public } from 'src/modules/auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller('base')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('find/:id')
    findOne(@Param('id', ParseIntPipe) id: any) {
        return `The ${id}`;
    }
    @Get('tasks')
    tasks() {
        return this.appService.getTasks();
    }

    @Public()
    @Get('tasksApi')
    tasksApi() {
        return this.appService.getTasksApi();
    }

}
