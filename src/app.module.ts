import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackController } from './modules/track/track.controller';
import { ArtistController } from './modules/artist/artist.controller';
import { AlbumController } from './modules/album/album.controller';
import { FavsController } from './modules/favs/favs.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [
    AppController,
    TrackController,
    ArtistController,
    AlbumController,
    FavsController,
  ],
  providers: [AppService],
})
export class AppModule {}
