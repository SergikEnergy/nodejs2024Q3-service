import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'User',
    description: 'User name in string format. Required.',
    required: true,
    type: String,
  })
  @IsNotEmpty({
    message: 'Required non empty field login was not provided',
  })
  login: string;

  @ApiProperty({
    example: 'password',
    description: 'User password. Required. No constrains for now.',
    required: true,
    type: String,
  })
  @IsNotEmpty({
    message: 'Required non empty field password was not provided',
  })
  password: string;
}
