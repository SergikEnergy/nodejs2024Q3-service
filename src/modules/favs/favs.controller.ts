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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesSwaggerResponse } from './interfaces/favorites-swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly artistService: ArtistService,
    private readonly albumsService: AlbumService,
    private readonly tracksService: TrackService,
  ) {}

  @ApiOperation({ summary: 'Get favorites collection' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all stored notes',
    type: FavoritesSwaggerResponse,
  })
  @Get()
  async findAll() {
    return await this.favsService.getAll();
  }

  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Track added to favorites',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found track in database',
  })
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

  @ApiOperation({ summary: 'delete track from favorites' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Track deleted from favorites',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found track in database',
  })
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

  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Album added to favorites',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found album in database',
  })
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

  @ApiOperation({ summary: 'delete album from favorites' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Album deleted from favorites',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found album in database',
  })
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

  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Artist added to favorites',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found artist in database',
  })
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

  @ApiOperation({ summary: 'delete artist from favorites' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist deleted from favorites',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found artist in database',
  })
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
