import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({
    message: 'please provide old password',
  })
  oldPassword: string;

  @IsNotEmpty({
    message: 'please provide new password',
  })
  newPassword: string;
}
