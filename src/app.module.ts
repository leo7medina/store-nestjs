import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './modules/database/database.module';
import { enviroments } from 'src/enviroments';
import config from 'src/config';

const env_node = () => {
    let value = './config/.env';
    if (process.env.NODE_ENV) {
        value = enviroments[process.env.NODE_ENV];
    }
    return value;
};

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: env_node(),
            load: [config],
            isGlobal: true,
            validationSchema: Joi.object({
                API_KEY: Joi.string().required(),
                DATABASE_NAME: Joi.string().required(),
                DATABASE_PORT: Joi.number().required(),
            }),
        }),
        HttpModule,
        UsersModule,
        ProductsModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'TASKS',
            useFactory: async (http: HttpService) => {
                const task = await http
                    .get('https://jsonplaceholder.typicode.com/todos')
                    .toPromise();
                return task?.data;
            },
            inject: [HttpService],
        },
    ],
})
export class AppModule {}
