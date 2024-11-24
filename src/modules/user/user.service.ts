import {
  BadRequestException,
  ForbiddenException,
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
import { compare, hash } from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const foundUser = await this.findByName(userDto.login);
    if (foundUser)
      throw new BadRequestException(
        `User with login:${userDto.login} already exists`,
      );

    const hashedPassword = await this.hashPassword(userDto.password);

    const newUser = {
      ...userDto,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };
    const createdUser = this.userRepository.create(newUser);

    return await this.userRepository.save(createdUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: string) {
    const foundUser = await this.userRepository.findOne({ where: { id } });

    if (!foundUser)
      throw new NotFoundException(`User with id:${id} not found!`);

    return foundUser;
  }

  async findByName(login: string) {
    return await this.userRepository.findOne({ where: { login } });
  }

  async update(id: string, info: UpdatePasswordDto) {
    const foundUser = await this.findById(id);

    const isPasswordValid = await this.comparePasswords(
      info.oldPassword,
      foundUser.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException("Incorrect user's password!");
    }

    const hashedNewPassword = await this.hashPassword(info.newPassword);

    const updatedUser: User = {
      ...foundUser,
      updatedAt: new Date(),
      version: ++foundUser.version,
      password: hashedNewPassword,
    };

    const result = await this.userRepository.save(updatedUser);

    if (!result) throw new InternalServerErrorException('Something went wrong');

    return result;
  }

  async deleteUser(id: string) {
    const res = await this.userRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`User with id:${id} not found!`);
    }
  }

  private async hashPassword(password: string) {
    return await hash(password, Number(process.env.salt) ?? 10);
  }

  private async comparePasswords(
    rawPassword: string,
    hashedOldPassword: string,
  ) {
    try {
      return await compare(rawPassword, hashedOldPassword);
    } catch {
      return false;
    }
  }
}
