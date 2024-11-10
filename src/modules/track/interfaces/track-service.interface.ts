import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { ITrack } from './track.interface';

export interface ITrackService {
  createTrack(track: CreateTrackDto): Promise<ITrack>;
  findAll(): Promise<ITrack[]>;
  findById(id: string): Promise<ITrack | null>;
  update(id: string, info: UpdateTrackDto): Promise<ITrack>;
  resetAlbumIdInTracks(albumId: string): Promise<boolean>;
  resetArtistIdInTracks(artistId: string): Promise<boolean>;
  deleteTrack(id: string): Promise<boolean>;
}
