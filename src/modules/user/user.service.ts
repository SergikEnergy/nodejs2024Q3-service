import { Injectable } from '@nestjs/common';
import { User, UserResponse } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

import { UpdatePasswordDto } from './dto/update-password.dto';
import { IUsersService } from './interfaces/users-service.interface';
import { InMemoryUsersStore } from './store/users-store';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private store: InMemoryUsersStore) {}

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
        const { password, ...restUserData } = user;
        return restUserData;
      });
    } catch (error) {}
  }

  async findById(id: string): Promise<UserResponse | null> {
    try {
      const foundUser = await this.store.findById(id);
      if (!foundUser) return null;
      const { password, ...restUserData } = foundUser;
      return restUserData;
    } catch (error) {}
  }

  async update(
    id: string,
    info: UpdatePasswordDto,
  ): Promise<UserResponse | null> {
    try {
      const foundUser = await this.store.findById(id);
      if (!foundUser) return null;

      const isPasswordValid = this.validateUserPassword(
        foundUser,
        info.oldPassword,
      );
      if (!isPasswordValid) {
        //TODO validate oldPassword
        return null;
      }

      const updatedUser: User = {
        ...foundUser,
        password: info.newPassword,
      };

      const result = await this.store.update(updatedUser);

      if (!result) return null;

      const { password, ...newUserWithoutPassword } = result;

      return newUserWithoutPassword;
    } catch (error) {}
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
