import { forwardRef, Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { InMemoryFavoritesStore } from './store/favorite-store';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    ValidateUUIDPipe,
    { provide: 'FavoritesStore', useClass: InMemoryFavoritesStore },
  ],

  exports: [FavsService],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
})
export class FavsModule {}
