import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService, // private readonly favsService: FavsService,
  ) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all tracks' })
  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @ApiOperation({ summary: 'Get track by id' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns track by id' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with id not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.trackService.findById(id);
  }

  @ApiOperation({ summary: 'Create new track' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Track created successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @ApiOperation({ summary: 'Update track by id' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Track was updated',
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
    description: 'Track with id not found',
  })
  @Put(':id')
  async update(
    @Param('id', new ValidateUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.trackService.update(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Track deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with id not found',
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
    await this.trackService.deleteTrack(id);
  }
}
