import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'password',
    description: "Old user's password. Required.",
    required: true,
  })
  @IsNotEmpty({
    message: 'please provide old password',
  })
  oldPassword: string;

  @ApiProperty({
    example: 'new_password',
    description: "New user's password. Required.",
    required: true,
  })
  @IsNotEmpty({
    message: 'please provide new password',
  })
  newPassword: string;
}
