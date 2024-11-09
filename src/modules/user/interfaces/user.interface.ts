import { HttpStatus } from '@nestjs/common';

export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type UserResponse = Omit<User, 'password'>;

export type UpdateUserResponse = {
  status: HttpStatus;
  data: User | null;
};
