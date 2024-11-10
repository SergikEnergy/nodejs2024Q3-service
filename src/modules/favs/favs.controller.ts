import {
  Controller,
  Post,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  HttpCode,
  Get,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { Response } from 'express';
import { NotFoundResourceException } from '../../common/exceptions/not-found-resource-exception';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly artistService: ArtistService,
    private readonly albumsService: AlbumService,
    private readonly tracksService: TrackService,
  ) {}

  @Get()
  async findAll() {
    return await this.favsService.getAll();
  }

  @Post('track/:id')
  async addTrack(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
    @Res() res: Response,
  ) {
    const trackInfo = await this.tracksService.findById(id);
    if (!trackInfo) {
      throw new NotFoundResourceException('track', id);
    }
    await this.favsService.addTrack(trackInfo);
    res.status(HttpStatus.CREATED).json({
      message: `Track with id:${id} was added to favorites collection.`,
    });
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ) {
    const isTrackInFavs = await this.favsService.findTrack(id);
    if (!isTrackInFavs) {
      throw new NotFoundException(
        `Track with id:${id} was not found in favorites!`,
      );
    }
    await this.favsService.deleteTrack(id);
  }

  @Post('album/:id')
  async addAlbum(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
    @Res() res: Response,
  ) {
    const albumInfo = await this.albumsService.findById(id);
    if (!albumInfo) {
      throw new NotFoundResourceException('album', id);
    }
    await this.favsService.addAlbum(albumInfo);
    res.status(HttpStatus.CREATED).json({
      message: `Album with id:${id} was added to favorites collection.`,
    });
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ) {
    const isAlbumInFavs = await this.favsService.findAlbum(id);
    if (!isAlbumInFavs) {
      throw new NotFoundException(
        `Album with id:${id} was not found in favorites!`,
      );
    }
    await this.favsService.deleteAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
    @Res() res: Response,
  ) {
    const artistInfo = await this.artistService.findById(id);
    if (!artistInfo) {
      throw new NotFoundResourceException('artist', id);
    }

    await this.favsService.addArtist(artistInfo);
    res.status(HttpStatus.CREATED).json({
      message: `Artist with id:${id} was added to favorites collection.`,
    });
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ) {
    const artistExist = await this.favsService.findArtist(id);
    if (!artistExist) {
      throw new NotFoundResourceException('artist', id);
    }

    await this.favsService.deleteArtist(id);
  }
}
