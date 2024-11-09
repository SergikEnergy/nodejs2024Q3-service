import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumsStore } from './store/album-store';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    { provide: 'AlbumService', useClass: InMemoryAlbumsStore },
    ValidateUUIDPipe,
  ],
})
export class AlbumModule {}
