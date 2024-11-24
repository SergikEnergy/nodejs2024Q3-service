import { IFavorites } from './favorites.interface';
import { TrackEntity } from '../../track/entities/track.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { AlbumEntity } from '../../album/entities/album.entity';

export interface IFavoritesService {
  getAll(): Promise<IFavorites>;
  findArtist(artistId: string): Promise<ArtistEntity>;
  findAlbum(albumId: string): Promise<AlbumEntity>;
  findTrack(trackId: string): Promise<TrackEntity>;
  deleteArtist(artistId: string): Promise<void>;
  deleteTrack(trackId: string): Promise<void>;
  deleteAlbum(albumId: string): Promise<void>;
  addArtist(artistId: string): Promise<void>;
  addAlbum(albumId: string): Promise<void>;
  addTrack(trackId: string): Promise<void>;
}
