import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT) ?? 5432,
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'secret',
  database: process.env.POSTGRES_DATABASE ?? 'db',
  synchronize: process.env.MODE === 'development',
  entities: ['dist/modules/**/entities/*.entity.js'],
  migrations: ['dist/database/migration/*.js'],
  migrationsRun: true,
};
