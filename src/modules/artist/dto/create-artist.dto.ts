import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty({
    message: 'Required non empty field name was not provided',
  })
  name: string;

  @IsNotEmpty({
    message: 'Required non empty field grammy was not provided',
  })
  @IsBoolean({
    message: 'Grammy should be boolean',
  })
  grammy: boolean;
}
