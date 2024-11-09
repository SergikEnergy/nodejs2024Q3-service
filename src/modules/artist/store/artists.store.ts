import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IArtistStore } from '../interfaces/artists-store.interface';
import { IArtist } from '../interfaces/artist.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';

@Injectable()
export class InMemoryArtistsStore implements IArtistStore {
  getIArtists(): Promise<IArtist[]> {
    throw new Error('Method not implemented.');
  }
  private artists: IArtist[] = [];

  async getArtists() {
    try {
      return this.artists;
    } catch (error) {}
  }

  async findById(id: string): Promise<IArtist | undefined> {
    try {
      return this.artists.find((artist) => artist.id === id);
    } catch (error) {}
  }

  async findByName(name: string) {
    try {
      return Boolean(this.artists.find((artist) => artist.name === name));
    } catch (error) {
      return false;
    }
  }

  async create(params: CreateArtistDto): Promise<IArtist> {
    try {
      const newArtist: IArtist = {
        id: uuidv4(),
        ...params,
      };
      this.artists.push(newArtist);
      return newArtist;
    } catch (error) {}
  }

  async update(params: IArtist): Promise<IArtist | null> {
    try {
      const artists = await this.getArtists();
      const artistIndex = artists.findIndex((item) => item.id === params.id);
      if (artistIndex === -1) return null;

      artists.splice(artistIndex, 1, params);

      this.artists = artists;

      return params;
    } catch (error) {}
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      this.artists = this.artists.filter((artist) => artist.id !== id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
