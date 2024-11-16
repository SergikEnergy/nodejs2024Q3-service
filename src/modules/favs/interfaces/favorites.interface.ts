import { ITrack } from '../../track/interfaces/track.interface';
import { IAlbum } from '../../album/interfaces/album.interface';
import { IArtist } from '../../artist/interfaces/artist.interface';

export interface IFavorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
