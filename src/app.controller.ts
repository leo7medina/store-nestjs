import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('base')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('find/:id')
    findOne(@Param('id') id: any) {
        return `The ${id}`;
    }

    @Get('/tasksmongo')
    getTasksMongoDB() {
        return this.appService.getTasksMongoDB();
    }
}
