import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { InMemoryFavoritesStore } from './store/favorite-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { FavsEntity } from './entities/favs.entity';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    ValidateUUIDPipe,
    { provide: 'FavoritesStore', useClass: InMemoryFavoritesStore },
  ],

  exports: [FavsService],
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      TrackEntity,
      AlbumEntity,
      FavsEntity,
    ]),
  ],
})
export class FavsModule {}
