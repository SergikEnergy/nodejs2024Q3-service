import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty({ nullable: true })
  artistId: string | null;
}
