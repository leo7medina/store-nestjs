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
import { TaskVO } from 'src/vo/TaskVO';
import { lastValueFrom } from 'rxjs';
import { AppConstants } from 'src/common/constants/app.constants';
import { AuthModule } from 'src/modules/auth/auth.module';
import * as process from 'node:process';

const env_node = () => {
    const env = process.env.NODE_ENV;
    if (env && Object.prototype.hasOwnProperty.call(enviroments, env)) {
        return enviroments[env as keyof typeof enviroments];
    }
    return './config/.env';
    // let value = './config/.env';
    // if (process.env.NODE_ENV) {
    //     value = enviroments[process.env.NODE_ENV];
    // }
    // return value;
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
                JWT_SECRET: Joi.string().required()
            }),
        }),
        HttpModule,
        UsersModule,
        ProductsModule,
        DatabaseModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: AppConstants.TASKS,
            useFactory: async (http: HttpService) => {
                const task = await lastValueFrom(
                    http.get<TaskVO[]>(AppConstants.URLS.TODOS)
                );
                return task?.data;
            },
            inject: [HttpService],
        },
    ],
})
export class AppModule {}
