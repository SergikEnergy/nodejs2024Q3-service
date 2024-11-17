import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface IArtistsService {
  createArtist(artist: CreateArtistDto): Promise<ArtistEntity>;
  findAll(): Promise<ArtistEntity[]>;
  findById(id: string): Promise<ArtistEntity>;
  update(id: string, info: UpdateArtistDto): Promise<ArtistEntity>;
  deleteArtist(id: string): Promise<void>;
}
