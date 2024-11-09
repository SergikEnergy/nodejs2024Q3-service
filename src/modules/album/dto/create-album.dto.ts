import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty({
    message: 'Required non empty field name was not provided',
  })
  name: string;

  @IsNotEmpty()
  @IsInt({ message: 'Year should be a number' })
  @IsPositive({ message: 'Year should be a positive number' })
  @Min(1000, { message: 'Year must be greater than 1000' })
  @Max(new Date().getFullYear(), { message: 'Year must be less than now' })
  year: number;

  @IsOptional()
  @IsUUID('4', {
    message: 'Validation Error! ArtistId field should have UUID format',
  })
  artistId: string | null;
}
