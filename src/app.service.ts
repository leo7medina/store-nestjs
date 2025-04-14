import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
    constructor(
        @Inject('TASKS') private tasks: any[],
        // @Inject('API_KEY') private apiKey: string,
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) {}

    getHello(): string {
        console.log(this.tasks);
        const apiKey = this.configService.apiKey;
        const name = this.configService.database.name;
        return `Hello World! ${apiKey}  ${name}`;
    }
}
