import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('base')
export class AppController {
    constructor(private readonly appService: AppService) {}

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

    @Get('tasksApi')
    tasksApi() {
        return this.appService.getTasksApi();
    }

}
