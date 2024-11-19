import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumsStore } from './store/album-store';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { FavsEntity } from '../favs/entities/favs.entity';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    { provide: 'AlbumStore', useClass: InMemoryAlbumsStore },
    ValidateUUIDPipe,
  ],
  exports: [AlbumService],
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
      FavsEntity,
    ]),
  ],
})
export class AlbumModule {}
