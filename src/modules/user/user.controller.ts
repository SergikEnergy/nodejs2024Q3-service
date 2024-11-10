import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponse } from './interfaces/user.interface';
import { UsersService } from './user.service';
import { NotFoundException } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<UserResponse[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  async findUserById(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserResponse> {
    const foundUser = await this.usersService.findById(id);
    if (foundUser) return foundUser;
    throw new NotFoundException(`User with id:${id} not found!`);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<UserResponse> {
    return await this.usersService.createUser(body);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const { data, status } = await this.usersService.update(id, body);
    switch (status) {
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException(`User with id:${id} not found!`);
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException("Incorrect user's password!");
      case HttpStatus.INTERNAL_SERVER_ERROR:
        throw new InternalServerErrorException('Something went wrong');

      default:
        return data;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const userInfo = await this.usersService.findById(id);
    if (!userInfo) {
      throw new NotFoundException(`User with id:${id} not found!`);
    }

    await this.usersService.deleteUser(id);
  }
}
