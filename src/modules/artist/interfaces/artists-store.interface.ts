import { CreateArtistDto } from '../dto/create-artist.dto';
import { IArtist } from './artist.interface';

export interface IArtistStore {
  getArtists(): Promise<IArtist[]>;
  findById(id: string): Promise<IArtist | undefined>;
  findByName(name: string): Promise<boolean>;
  create(artist: CreateArtistDto): Promise<IArtist>;
  update(artist: IArtist): Promise<IArtist | null>;
  deleteById(id: string): Promise<boolean>;
}
