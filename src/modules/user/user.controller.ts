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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all users' })
  @Get()
  async findAllUsers(): Promise<UserResponse[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return user by id' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with id not found',
  })
  @Get(':id')
  async findUserById(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserResponse> {
    const foundUser = await this.usersService.findById(id);
    if (foundUser) return foundUser;
    throw new NotFoundException(`User with id:${id} not found!`);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<UserResponse> {
    return await this.usersService.createUser(body);
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Password updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with id not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid id format',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Invalid input',
  })
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

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with id not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid id format',
  })
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
