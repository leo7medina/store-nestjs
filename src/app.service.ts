import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
    constructor(
        @Inject('TASKS') private tasks: any[],
        @Inject('MONGO_DB') private database: Db,
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) {}

    getHello(): string {
        console.log(this.tasks);
        const apiKey = this.configService.apiKey;
        const name = this.configService.database.name;
        return `Hello World! ${apiKey}  ${name}`;
    }

    getTasksMongoDB() {
        const tasksCollection = this.database.collection('tasks');
        return tasksCollection.find().toArray();
    }
}
