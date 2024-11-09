import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumsStore } from './store/album-store';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { FavsModule } from '../favs/favs.module';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    { provide: 'AlbumStore', useClass: InMemoryAlbumsStore },
    ValidateUUIDPipe,
  ],
  exports: [AlbumService],
  imports: [forwardRef(() => FavsModule)],
})
export class AlbumModule {}
