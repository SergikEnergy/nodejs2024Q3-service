import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { IAlbum } from './album.interface';

export interface IAlbumService {
  createAlbum(album: CreateAlbumDto): Promise<IAlbum>;
  findAll(): Promise<IAlbum[]>;
  findById(id: string): Promise<IAlbum | null>;
  update(id: string, info: UpdateAlbumDto): Promise<IAlbum>;
  deleteAlbum(id: string): Promise<boolean>;
  removeArtistId(artistId: string): Promise<boolean>;
}
