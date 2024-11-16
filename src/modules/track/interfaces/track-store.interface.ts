import { CreateTrackDto } from '../dto/create-track.dto';
import { ITrack } from './track.interface';

export interface ITrackStore {
  getTracks(): Promise<ITrack[]>;
  findById(id: string): Promise<ITrack | undefined>;
  create(track: CreateTrackDto): Promise<ITrack>;
  update(track: ITrack): Promise<ITrack | null>;
  deleteById(id: string): Promise<boolean>;
  resetAlbumIdsInTracks(albumId: string): Promise<boolean>;
  resetArtistIdsInTracks(artistId: string): Promise<boolean>;
}
