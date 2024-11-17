import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { FavsService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService, // private readonly favsService: FavsService, // private readonly trackService: TrackService,
  ) {}

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all albums' })
  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @ApiOperation({ summary: 'Get album by id' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns album by id' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with id not found',
  })
  @Get(':id')
  async findById(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ) {
    const foundAlbum = await this.albumService.findById(id);
    if (!foundAlbum)
      throw new NotFoundException(`Album with id:${id} not found!`);
    return foundAlbum;
  }

  @ApiOperation({ summary: 'Create new album' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Album created successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @ApiOperation({ summary: 'Update album by id' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Album was updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid id format',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with id not found',
  })
  @Put(':id')
  async update(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Album deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with id not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid id format',
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ) {
    await Promise.all([
      this.albumService.deleteAlbum(id),
      // this.favsService.deleteAlbum(id),
      // this.trackService.resetAlbumIdInTracks(id),
    ]);
  }
}
