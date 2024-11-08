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
import { UserResponse } from './interfaces/user.interface';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<UserResponse[]> {
    try {
      const users = await this.usersService.findAll();
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<UserResponse> {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<UserResponse> {
    try {
      return await this.usersService.createUser(body);
    } catch (error) {}
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() body: UpdatePasswordDto,
  ): Promise<UserResponse> {
    try {
      return await this.usersService.update(id, body);
    } catch (error) {}
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.usersService.deleteUser(id);
    } catch (error) {}
  }
}
