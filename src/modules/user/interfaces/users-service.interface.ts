import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdateUserResponse, User, UserResponse } from './user.interface';

export interface IUsersService {
  createUser(user: CreateUserDto): Promise<UserResponse>;
  findAll(): Promise<UserResponse[]>;
  findById(id: string): Promise<UserResponse | null>;
  update(id: string, info: UpdatePasswordDto): Promise<UpdateUserResponse>;
  deleteUser(id: string): Promise<void>;
  validateUserPassword(user: User, oldPassword: string): boolean;
}
