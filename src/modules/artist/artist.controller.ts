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
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { IArtist } from './interfaces/artist.interface';
import { FavsService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  @Get()
  async findAll(): Promise<IArtist[]> {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ): Promise<IArtist> {
    const foundArtist = await this.artistService.findById(id);
    if (!foundArtist)
      throw new NotFoundException(`Artist with id:${id} not found!`);
    return foundArtist;
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<IArtist> {
    return await this.artistService.createArtist(createArtistDto);
  }

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
