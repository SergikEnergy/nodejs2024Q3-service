import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    example: 'Popular Man',
    description: 'Artist name. Required',
    required: true,
    type: String,
  })
  @IsNotEmpty({
    message: 'Required non empty field name was not provided',
  })
  name: string;

  @ApiProperty({
    example: false,
    description: 'Shows had artist grammy or not. Required',
    required: true,
    type: Boolean,
  })
  @IsNotEmpty({
    message: 'Required non empty field grammy was not provided',
  })
  @IsBoolean({
    message: 'Grammy should be boolean',
  })
  grammy: boolean;
}
