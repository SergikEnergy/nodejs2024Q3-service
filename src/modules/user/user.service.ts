import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  UpdateUserResponse,
  User,
  UserResponse,
} from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

import { UpdatePasswordDto } from './dto/update-password.dto';
import { IUsersService } from './interfaces/users-service.interface';
import { IUserStore } from './interfaces/users-store.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(@Inject('UserStore') private store: IUserStore) {}

  async createUser(user: CreateUserDto): Promise<UserResponse> {
    try {
      const { password, ...restUser } = await this.store.create(user);

      return restUser;
    } catch (error) {}
  }

  async findAll(): Promise<UserResponse[]> {
    try {
      const users = await this.store.getUsers();
      return users.map((user) => {
        delete user.password;
        return user;
      });
    } catch (error) {}
  }

  async findById(id: string): Promise<UserResponse | null> {
    try {
      const foundUser = await this.store.findById(id);
      if (!foundUser) return null;
      delete foundUser.password;

      return foundUser;
    } catch (error) {}
  }

  async update(
    id: string,
    info: UpdatePasswordDto,
  ): Promise<UpdateUserResponse> {
    try {
      const foundUser = await this.store.findById(id);
      if (!foundUser) return { data: null, status: HttpStatus.NOT_FOUND };

      const isPasswordValid = this.validateUserPassword(
        foundUser,
        info.oldPassword,
      );
      if (!isPasswordValid) {
        return { data: null, status: HttpStatus.FORBIDDEN };
      }

      const updatedUser: User = {
        ...foundUser,
        password: info.newPassword,
      };

      const result = await this.store.update(updatedUser);

      if (!result)
        return { data: null, status: HttpStatus.INTERNAL_SERVER_ERROR };

      delete result.password;

      return { data: result, status: HttpStatus.OK };
    } catch (error) {
      return { data: null, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.store.deleteById(id);
    } catch (error) {}
  }

  validateUserPassword(user: User, oldPassword: string): boolean {
    return user.password === oldPassword;
  }
}
