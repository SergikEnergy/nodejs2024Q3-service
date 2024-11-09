import { CreateAlbumDto } from '../dto/create-album.dto';
import { IAlbum } from '../interfaces/album.interface';

export interface IAlbumStore {
  getAlbums(): Promise<IAlbum[]>;
  findById(id: string): Promise<IAlbum | undefined>;
  findByArtistId(id: string): Promise<IAlbum | undefined>;
  create(album: CreateAlbumDto): Promise<IAlbum>;
  update(album: IAlbum): Promise<IAlbum | null>;
  deleteById(id: string): Promise<boolean>;
}
