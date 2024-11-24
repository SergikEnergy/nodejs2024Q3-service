import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackService } from './interfaces/track-service.interface';
import { ITrack } from './interfaces/track.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';

@Injectable()
export class TrackService implements ITrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async findAll(): Promise<ITrack[]> {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async findById(id: string): Promise<ITrack> {
    const foundTrack = await this.trackRepository.findOne({ where: { id } });

    if (!foundTrack)
      throw new NotFoundException(`Track with id:${id} not found!`);

    return foundTrack;
  }

  async createTrack(track: CreateTrackDto): Promise<ITrack> {
    const existedArtist = await this.artistRepository.findOne({
      where: { id: track.artistId },
    });
    if (!existedArtist)
      throw new NotFoundException(
        `Artist with id:${track.artistId} not found in database!`,
      );

    const existedAlbum = await this.albumRepository.findOne({
      where: { id: track.albumId },
    });

    if (!existedAlbum)
      throw new NotFoundException(
        `Album with id:${track.albumId} not found in database!`,
      );

    const newTrack = this.trackRepository.create(track);
    return await this.trackRepository.save(newTrack);
  }

  async update(id: string, info: UpdateTrackDto): Promise<ITrack> {
    const foundTrack = await this.findById(id);

    const updatedTrack = { ...foundTrack, ...info };
    return await this.trackRepository.save(updatedTrack);
  }

  async deleteTrack(id: string): Promise<void> {
    const res = await this.trackRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Track with id:${id} not found!`);
    }
  }
}
