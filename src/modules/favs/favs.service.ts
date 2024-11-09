import { Inject, Injectable } from '@nestjs/common';
import { IFavoritesService } from './interfaces/favorites-service.interface';
import { IAlbum } from '../album/interfaces/album.interface';
import { IArtist } from '../artist/interfaces/artist.interface';
import { ITrack } from '../track/interfaces/track.interface';
import { IFavorites } from './interfaces/favorites.interface';
import { FavoritesStore } from './interfaces/favorites-store.interface';

@Injectable()
export class FavsService implements IFavoritesService {
  constructor(
    @Inject('FavoritesStore') private readonly store: FavoritesStore,
  ) {}

  async getAll(): Promise<IFavorites> {
    try {
      return await this.store.getFavs();
    } catch (error) {}
  }

  async findArtist(artistId: string): Promise<IArtist | undefined> {
    try {
      return await this.store.findArtistInFavs(artistId);
    } catch (error) {}
  }

  async findAlbum(albumId: string): Promise<IAlbum | undefined> {
    try {
      return await this.store.findAlbumInFavs(albumId);
    } catch (error) {}
  }

  async findTrack(trackId: string): Promise<ITrack | undefined> {
    try {
      return await this.store.findTrackInFavs(trackId);
    } catch (error) {}
  }

  async deleteArtist(artistId: string): Promise<boolean> {
    try {
      await this.store.deleteArtistFromFavs(artistId);
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteTrack(trackId: string): Promise<boolean> {
    try {
      await this.store.deleteTrackFromFavs(trackId);
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteAlbum(albumId: string): Promise<boolean> {
    try {
      await this.store.deleteAlbumFromFavs(albumId);
      return true;
    } catch (error) {
      return false;
    }
  }

  async addArtist(artist: IArtist): Promise<boolean> {
    try {
      await this.store.addArtistToFavs(artist);
      return true;
    } catch (error) {
      return false;
    }
  }

  async addAlbum(album: IAlbum): Promise<boolean> {
    try {
      await this.store.addAlbumToFavs(album);
      return true;
    } catch (error) {
      return false;
    }
  }

  async addTrack(track: ITrack): Promise<boolean> {
    try {
      await this.store.addTrackToFavs(track);
      return true;
    } catch (error) {
      return false;
    }
  }
}
