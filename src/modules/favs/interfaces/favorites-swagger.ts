import { ApiProperty } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { AlbumEntity } from '../../album/entities/album.entity';
import { TrackEntity } from '../../track/entities/track.entity';

@Injectable()
export class FavoritesSwaggerResponse {
  @ApiProperty({ type: () => [ArtistEntity] })
  artists: ArtistEntity[];

  @ApiProperty({ type: () => [AlbumEntity] })
  albums: AlbumEntity[];

  @ApiProperty({ type: () => [TrackEntity] })
  tracks: TrackEntity[];
}
