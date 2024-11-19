import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponse } from './interfaces/user.interface';
import { UsersService } from './user.service';
import { NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all users' })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserEntity })
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
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserEntity })
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
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserEntity })
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
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserEntity })
  @Put(':id')
  async updateUserById(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdatePasswordDto,
  ): Promise<UserResponse> {
    return await this.usersService.update(id, body);
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
    await this.usersService.deleteUser(id);
  }
}
