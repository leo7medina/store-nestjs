import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('config', () => {
    return {
        database: {
            name: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
        },
        postgres: {
            dbName: process.env.POSTGRES_DB,
            port: parseInt(process.env.POSTGRES_PORT || '', 10),
            password: process.env.POSTGRES_PASSWORD,
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
        },
        mysql: {
            dbName: process.env.MYSQL_DATABASE,
            port: parseInt(process.env.MYSQL_PORT || '', 10),
            password: process.env.MYSQL_PASSWORD,
            user: process.env.MYSQL_USER,
            host: process.env.MYSQL_HOST,
        },
        mongo: {
            dbName: process.env.MONGO_DB,
            port: parseInt(process.env.MONGO_PORT || '', 10),
            password: process.env.MONGO_INITDB_ROOT_PASSWORD,
            user: process.env.MONGO_INITDB_ROOT_USERNAME,
            host: process.env.MONGO_HOST,
            connection: process.env.MONGO_CONNECTION,
        },
        apiKey: process.env.API_KEY,
    };
});
