import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTrackStore } from './store/track-store';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { FavsEntity } from '../favs/entities/favs.entity';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    { provide: 'TrackStore', useClass: InMemoryTrackStore },
    ValidateUUIDPipe,
  ],
  exports: [TrackService],
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      ArtistEntity,
      AlbumEntity,
      FavsEntity,
    ]),
  ],
})
export class TrackModule {}
