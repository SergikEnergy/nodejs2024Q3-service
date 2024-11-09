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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ) {
    const foundTrack = await this.trackService.findById(id);
    if (!foundTrack)
      throw new NotFoundException(`Track with id:${id} not found!`);

    return foundTrack;
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const foundTrack = await this.trackService.findById(id);
    if (!foundTrack)
      throw new NotFoundException(`Track with id:${id} not found!`);

    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ) {
    const foundTrack = await this.trackService.findById(id);
    if (!foundTrack)
      throw new NotFoundException(`Track with id:${id} not found!`);

    return await this.trackService.deleteTrack(id);
  }
}
