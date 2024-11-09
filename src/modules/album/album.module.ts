import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumsStore } from './store/album-store';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    { provide: 'AlbumService', useClass: InMemoryAlbumsStore },
  ],
})
export class AlbumModule {}
