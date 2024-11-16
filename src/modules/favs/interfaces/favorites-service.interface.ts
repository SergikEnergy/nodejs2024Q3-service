import { IArtist } from '../../../modules/artist/interfaces/artist.interface';
import { IFavorites } from './favorites.interface';
import { IAlbum } from '../../../modules/album/interfaces/album.interface';
import { ITrack } from '../../../modules/track/interfaces/track.interface';

export interface IFavoritesService {
  getAll(): Promise<IFavorites>;
  findArtist(artistId: string): Promise<IArtist | undefined>;
  findAlbum(albumId: string): Promise<IAlbum | undefined>;
  findTrack(trackId: string): Promise<ITrack | undefined>;
  deleteArtist(artistId: string): Promise<boolean>;
  deleteTrack(trackId: string): Promise<boolean>;
  deleteAlbum(albumId: string): Promise<boolean>;
  addArtist(artist: IArtist): Promise<boolean>;
  addAlbum(album: IAlbum): Promise<boolean>;
  addTrack(track: ITrack): Promise<boolean>;
}
