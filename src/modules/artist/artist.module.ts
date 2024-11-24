import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { InMemoryArtistsStore } from './store/artists.store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { FavsEntity } from '../favs/entities/favs.entity';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    { useClass: InMemoryArtistsStore, provide: 'ArtistStore' },
    ValidateUUIDPipe,
  ],
  exports: [ArtistService],
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
      FavsEntity,
    ]),
  ],
})
export class ArtistModule {}
