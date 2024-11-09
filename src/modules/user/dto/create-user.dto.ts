import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Required non empty field login was not provided',
  })
  login: string;

  @IsNotEmpty({
    message: 'Required non empty field password was not provided',
  })
  password: string;
}
