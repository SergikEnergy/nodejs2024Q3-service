import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { InMemoryArtistsStore } from './store/artists.store';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    { useClass: InMemoryArtistsStore, provide: 'ArtistStore' },
    ValidateUUIDPipe,
  ],
})
export class ArtistModule {}
