import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UpdatePassword } from './interfaces/update-password.interface';
import { CreateUser } from './interfaces/create-user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async createUser(user: CreateUser): Promise<User> {
    return (await {}) as User;
  }

  async findAll(): Promise<User[]> {
    return await this.users;
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.users.find((user) => user.id === id);
  }

  async update(id: string, info: UpdatePassword): Promise<User | undefined> {
    return await this.users.find((user) => user.id === id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.users.filter((user) => user.id !== id);
  }
}
