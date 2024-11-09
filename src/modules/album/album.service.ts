import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbumService } from './interfaces/album-service.interface';
import { IAlbum } from './interfaces/album.interface';
import { IAlbumStore } from './interfaces/album-store.interface';

@Injectable()
export class AlbumService implements IAlbumService {
  constructor(@Inject('AlbumService') private readonly store: IAlbumStore) {}

  async findAll(): Promise<IAlbum[]> {
    try {
      return await this.store.getAlbums();
    } catch (error) {}
  }

  async findById(id: string): Promise<IAlbum | null> {
    try {
      return await this.store.findById(id);
    } catch (error) {}
  }

  async createAlbum(album: CreateAlbumDto): Promise<IAlbum> {
    try {
      return await this.store.create(album);
    } catch (error) {}
  }

  async update(id: string, info: UpdateAlbumDto): Promise<IAlbum> {
    try {
      return await this.store.update({ id, ...info });
    } catch (error) {}
  }
  async deleteAlbum(id: string): Promise<boolean> {
    try {
      await this.store.deleteById(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
