import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    example: 'Track',
    description: 'Track name. Required',
    required: true,
    type: String,
  })
  @IsNotEmpty({
    message: 'Required non empty field name was not provided',
  })
  name: string;

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

  @ApiProperty({
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    description: 'Album id in UUID version4 format, optional.',
    required: false,
    nullable: true,
    type: String,
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'Validation Error! AlbumId field should have UUID format',
  })
  albumId: string | null;

  @ApiProperty({
    example: 123,
    description: 'Track duration - should be greater than null and integer.',
    required: true,
    type: Number,
  })
  @IsInt()
  @Min(1, { message: 'Duration should be provided and be positive number' })
  duration: number;
}
