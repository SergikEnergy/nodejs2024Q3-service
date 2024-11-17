import * as dotenv from 'dotenv';

import { DataSourceOptions } from 'typeorm';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: parseInt(process.env.POSTGRES_PORT) ?? 5433,
  username: process.env.POSTGRES_USER ?? 'testUser',
  password: process.env.POSTGRES_PASSWORD ?? 'testSecret',
  database: process.env.POSTGRES_DATABASE ?? 'testDb',
  synchronize: process.env.MODE === 'development',
  entities: ['dist/modules/**/entities/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  migrationsRun: true,
} as DataSourceOptions;
