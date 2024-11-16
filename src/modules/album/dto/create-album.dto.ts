import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

const CURR_YEAR = new Date().getFullYear();

export class CreateAlbumDto {
  @ApiProperty({
    example: 'testUser',
    description: "Album's name",
    required: true,
    type: String,
  })
  @IsNotEmpty({
    message: 'Required non empty field name was not provided',
  })
  name: string;

  @ApiProperty({
    example: '1990',
    description: "Album's release year",
    required: true,
    type: Number,
    minimum: 1000,
    maximum: CURR_YEAR,
  })
  @IsNotEmpty()
  @IsInt({ message: 'Year should be a number' })
  @IsPositive({ message: 'Year should be a positive number' })
  @Min(1000, { message: 'Year must be greater than 1000' })
  @Max(CURR_YEAR, { message: 'Year must be less than now' })
  year: number;

  @ApiProperty({
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    description: 'Artist id in UUID version4 format, optional.',
    required: false,
    nullable: true,
    type: String,
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'Validation Error! ArtistId field should have UUID format',
  })
  artistId: string | null;
}
