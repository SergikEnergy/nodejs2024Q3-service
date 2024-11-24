import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from './user.interface';

export interface IUsersService {
  createUser(user: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  update(id: string, info: UpdatePasswordDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
  findByName(name: string): Promise<User>;
}
