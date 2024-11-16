import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { IArtist } from './interfaces/artist.interface';
import { FavsService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all albums' })
  @Get()
  async findAll(): Promise<IArtist[]> {
    return await this.artistService.findAll();
  }

  @ApiOperation({ summary: 'Get artist by id' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns artist by id' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with id not found',
  })
  @Get(':id')
  async findById(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ): Promise<IArtist> {
    const foundArtist = await this.artistService.findById(id);
    if (!foundArtist)
      throw new NotFoundException(`Artist with id:${id} not found!`);
    return foundArtist;
  }

  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Artist created successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<IArtist> {
    return await this.artistService.createArtist(createArtistDto);
  }

  @ApiOperation({ summary: 'Update artist by id' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Artist was updated',
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
    description: 'Artist with id not found',
  })
  @Put(':id')
  async updateArtistById(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist> {
    const artistInfo = await this.artistService.findById(id);
    if (!artistInfo) {
      throw new NotFoundException(`Artist with id:${id} not found!`);
    }

    const result = await this.artistService.update(id, updateArtistDto);
    return result;
  }

  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with id not found',
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
    const artistInfo = await this.artistService.findById(id);
    if (!artistInfo) {
      throw new NotFoundException(`Artist with id:${id} not found!`);
    }

    await Promise.all([
      this.artistService.deleteArtist(id),
      this.trackService.resetArtistIdInTracks(id),
      this.albumService.removeArtistId(id),
      this.favsService.deleteArtist(id),
    ]);
  }
}
