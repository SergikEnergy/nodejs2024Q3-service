import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { IUserStore } from '../interfaces/users-store.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InMemoryUsersStore implements IUserStore {
  private users: User[] = [];

  async getUsers(): Promise<User[]> {
    try {
      return this.users;
    } catch (error) {}
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      return this.users.find((user) => user.id === id);
    } catch (error) {}
  }

  async create(params: CreateUserDto): Promise<User> {
    try {
      const newUser: User = {
        id: uuidv4(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
        login: params.login,
        password: params.password,
      };
      this.users.push(newUser);
      return newUser;
    } catch (error) {}
  }

  async update(user: User): Promise<User | null> {
    try {
      const users = await this.getUsers();
      const userIndex = users.findIndex((item) => item.id === user.id);
      if (userIndex === -1) return null;

      const updatedUser = {
        ...user,
        updatedAt: Date.now(),
        version: user.version++,
      };

      users.splice(userIndex, 1, updatedUser);

      this.users = users;

      return updatedUser;
    } catch (error) {}
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      this.users = this.users.filter((user) => user.id !== id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
