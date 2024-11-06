import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User, UserResponse } from './interfaces/user.interface';
import { UsersService } from './user.service';
import { CreateUser } from './interfaces/create-user';
import { UpdatePassword } from './interfaces/update-password.interface';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<string> {
    await this.usersService.findAll();
    return 'answer';
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<string> {
    await this.usersService.findById(id);
    return `answer ${id}`;
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<UserResponse> {
    await this.usersService.createUser(body as CreateUser);
    return {} as UserResponse;
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() body: UpdatePasswordDto,
  ): Promise<UserResponse> {
    await this.usersService.update(id, body as UpdatePassword);
    return {} as UserResponse;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return;
  }
}
