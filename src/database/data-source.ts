import { DataSource } from 'typeorm';
import { dbOptions } from './ormconfig';

const AppDataSource = new DataSource(dbOptions);
export default AppDataSource;
