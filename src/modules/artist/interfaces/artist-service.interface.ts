import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { IArtist } from './artist.interface';

export interface IArtistsService {
  createArtist(artist: CreateArtistDto): Promise<IArtist>;
  findAll(): Promise<IArtist[]>;
  findById(id: string): Promise<IArtist>;
  update(id: string, info: UpdateArtistDto): Promise<IArtist>;
  deleteArtist(id: string): Promise<void>;
}
