import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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
    findOne(@Param('id') id: any) {
        return `The ${id}`;
    }

    @Public()
    @Get('/tasksmongo')
    getTasksMongoDB() {
        return this.appService.getTasksMongoDB();
    }
}
