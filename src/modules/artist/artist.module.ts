import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { InMemoryArtistsStore } from './store/artists.store';
import { FavsModule } from '../favs/favs.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    { useClass: InMemoryArtistsStore, provide: 'ArtistStore' },
    ValidateUUIDPipe,
  ],
  exports: [ArtistService],
  imports: [
    forwardRef(() => FavsModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
})
export class ArtistModule {}
