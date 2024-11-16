import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  grammy: boolean;
}
