import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistsService } from './interfaces/artist-service.interface';
import { IArtistStore } from './interfaces/artists-store.interface';

@Injectable()
export class ArtistService implements IArtistsService {
  constructor(@Inject('ArtistStore') private store: IArtistStore) {}

  async createArtist(createArtistDto: CreateArtistDto) {
    try {
      return await this.store.create(createArtistDto);
    } catch (error) {}
  }

  async findAll() {
    try {
      return await this.store.getArtists();
    } catch (error) {}
  }

  async findById(id: string) {
    try {
      return await this.store.findById(id);
    } catch (error) {}
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.store.update({ id, ...updateArtistDto });
    } catch (error) {}
  }

  async deleteArtist(id: string) {
    try {
      return await this.store.deleteById(id);
    } catch (error) {}
  }
}
