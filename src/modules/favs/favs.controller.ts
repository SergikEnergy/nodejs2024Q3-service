import {
  Controller,
  Post,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { Response } from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesSwaggerResponse } from './interfaces/favorites-swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

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
    await this.favsService.addTrack(id);
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
    await this.favsService.addAlbum(id);
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
    await this.favsService.addArtist(id);
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
    await this.favsService.deleteArtist(id);
  }
}
