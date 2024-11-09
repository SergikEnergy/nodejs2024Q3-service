import { IsInt, IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty({
    message: 'Required non empty field name was not provided',
  })
  name: string;

  @IsOptional()
  @IsUUID('4', {
    message: 'Validation Error! ArtistId field should have UUID format',
  })
  artistId: string | null;

  @IsOptional()
  @IsUUID('4', {
    message: 'Validation Error! AlbumId field should have UUID format',
  })
  albumId: string | null;

  @IsInt()
  @Min(1, { message: 'Duration should be provided and be positive number' })
  duration: number;
}
