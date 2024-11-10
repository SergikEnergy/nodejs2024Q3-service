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
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { FavsService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ) {
    const foundAlbum = await this.albumService.findById(id);
    if (!foundAlbum)
      throw new NotFoundException(`Album with id:${id} not found!`);
    return foundAlbum;
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const albumInfo = await this.albumService.findById(id);
    if (!albumInfo) {
      throw new NotFoundException(`Album with id:${id} not found!`);
    }

    const result = await this.albumService.update(id, updateAlbumDto);
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ) {
    const albumInfo = await this.albumService.findById(id);
    if (!albumInfo) {
      throw new NotFoundException(`Album with id:${id} not found!`);
    }

    await Promise.all([
      this.albumService.deleteAlbum(id),
      this.favsService.deleteAlbum(id),
      this.trackService.resetAlbumIdInTracks(id),
    ]);
  }
}
