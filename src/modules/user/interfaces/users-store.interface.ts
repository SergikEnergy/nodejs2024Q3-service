import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './user.interface';

export interface IUserStore {
  getUsers(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  create(user: CreateUserDto): Promise<User>;
  update(user: User): Promise<User | null>;
  deleteById(id: string): Promise<boolean>;
}
