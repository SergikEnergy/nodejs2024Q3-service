import { IArtist } from '../../../modules/artist/interfaces/artist.interface';
import { IFavorites } from './favorites.interface';
import { IAlbum } from '../../../modules/album/interfaces/album.interface';
import { ITrack } from '../../../modules/track/interfaces/track.interface';

export interface FavoritesStore {
  getFavs(): Promise<IFavorites>;
  findArtistInFavs(artistId: string): Promise<IArtist | undefined>;
  findAlbumInFavs(albumId: string): Promise<IAlbum | undefined>;
  findTrackInFavs(trackId: string): Promise<ITrack | undefined>;
  deleteArtistFromFavs(artistId: string): Promise<boolean>;
  deleteTrackFromFavs(trackId: string): Promise<boolean>;
  deleteAlbumFromFavs(albumId: string): Promise<boolean>;
  addArtistToFavs(artist: IArtist): Promise<boolean>;
  addAlbumToFavs(album: IAlbum): Promise<boolean>;
  addTrackToFavs(track: ITrack): Promise<boolean>;
}
