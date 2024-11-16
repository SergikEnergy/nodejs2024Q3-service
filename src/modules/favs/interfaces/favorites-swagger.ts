import { ApiProperty } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';
import { ArtistEntity } from '../../../modules/artist/entities/artist';
import { AlbumEntity } from '../../../modules/album/entities/album';
import { TrackEntity } from '../../../modules/track/entities/track';

@Injectable()
export class FavoritesSwaggerResponse {
  @ApiProperty({ type: () => [ArtistEntity] })
  artists: ArtistEntity[];

  @ApiProperty({ type: () => [AlbumEntity] })
  albums: AlbumEntity[];

  @ApiProperty({ type: () => [TrackEntity] })
  tracks: TrackEntity[];
}
