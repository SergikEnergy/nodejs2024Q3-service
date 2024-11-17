import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbumService } from './interfaces/album-service.interface';
import { IAlbum } from './interfaces/album.interface';
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
  removeArtistId(artistId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<IAlbum[]> {
    const albums = await this.albumRepository.find();
    return albums.map((album) => album.getAlbums());
  }

  async findById(id: string): Promise<IAlbum> {
    const foundAlbum = await this.albumRepository.findOne({ where: { id } });

    if (!foundAlbum)
      throw new NotFoundException(`Album with id:${id} not found!`);

    return foundAlbum.getAlbums();
  }

  async createAlbum(album: CreateAlbumDto): Promise<IAlbum> {
    const existedArtist = this.artistRepository.findOne({
      where: { id: album.artistId },
    });

    if (!existedArtist)
      throw new NotFoundException(
        `Artist with id:${album.artistId} not found in database!`,
      );

    const newAlbum = this.albumRepository.create(album);
    return (await this.albumRepository.save(newAlbum)).getAlbums();
  }

  async update(id: string, info: UpdateAlbumDto): Promise<IAlbum> {
    const foundAlbum = await this.findById(id);

    const updatedAlbum = { ...foundAlbum, ...info };
    await this.albumRepository.save(updatedAlbum);

    return updatedAlbum;
  }

  async deleteAlbum(id: string): Promise<void> {
    const res = await this.albumRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Album with id:${id} not found!`);
    }
  }
}
