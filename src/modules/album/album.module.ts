import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumsStore } from './store/album-store';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { FavsModule } from '../favs/favs.module';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    { provide: 'AlbumStore', useClass: InMemoryAlbumsStore },
    ValidateUUIDPipe,
  ],
  exports: [AlbumService],
  imports: [forwardRef(() => FavsModule), forwardRef(() => TrackModule)],
})
export class AlbumModule {}
