import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User, UserResponse } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

import { UpdatePasswordDto } from './dto/update-password.dto';
import { IUsersService } from './interfaces/users-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const newUser = {
      ...userDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };
    const createdUser = this.userRepository.create(newUser);

    return (await this.userRepository.save(createdUser)).getUserInfo();
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map((user) => user.getUserInfo());
  }

  async findById(id: string) {
    const foundUser = await this.userRepository.findOne({ where: { id } });

    if (!foundUser) return null;

    return foundUser.getUserInfo();
  }

  async update(id: string, info: UpdatePasswordDto): Promise<UserResponse> {
    const foundUser = await this.userRepository.findOne({ where: { id } });

    if (!foundUser)
      throw new NotFoundException(`User with id:${id} not found!`);

    const isPasswordValid = this.validateUserPassword(
      foundUser,
      info.oldPassword,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException("Incorrect user's password!");
    }

    const updatedUser: User = {
      ...foundUser,
      updatedAt: new Date(),
      version: ++foundUser.version,
      password: info.newPassword,
    };

    const result = await this.userRepository.save(updatedUser);

    if (!result) throw new InternalServerErrorException('Something went wrong');

    return result;
  }

  async deleteUser(id: string): Promise<void> {
    const res = await this.userRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`User with id:${id} not found!`);
    }
  }

  validateUserPassword(user: User, oldPassword: string): boolean {
    return user.password === oldPassword;
  }
}
