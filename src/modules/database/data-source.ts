import { config }from 'dotenv';
import { DataSource } from 'typeorm';

config({path: 'config/.env'});
//url: process.env.DATABASE_URL,
export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/modules/database/migrations/*.ts'],
    migrationsTableName: 'migrations',
});
