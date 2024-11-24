import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbumService } from './interfaces/album-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../artist/entities/artist.entity';

@Injectable()
export class AlbumService implements IAlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(AlbumEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async findAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findById(id: string) {
    const foundAlbum = await this.albumRepository.findOne({ where: { id } });

    if (!foundAlbum)
      throw new NotFoundException(`Album with id:${id} not found!`);

    return foundAlbum;
  }

  async createAlbum(album: CreateAlbumDto) {
    const existedArtist = this.artistRepository.findOne({
      where: { id: album.artistId },
    });

    if (!existedArtist)
      throw new NotFoundException(
        `Artist with id:${album.artistId} not found in database!`,
      );

    const newAlbum = this.albumRepository.create(album);
    return await this.albumRepository.save(newAlbum);
  }

  async update(id: string, info: UpdateAlbumDto) {
    const foundAlbum = await this.findById(id);

    const updatedAlbum = { ...foundAlbum, ...info };
    return await this.albumRepository.save(updatedAlbum);
  }

  async deleteAlbum(id: string) {
    const res = await this.albumRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Album with id:${id} not found!`);
    }
  }
}
