import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { dbOptions } from './ormconfig';

export const typeOrmConfig: TypeOrmModuleOptions = dbOptions;

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async () => dbOptions,
};
