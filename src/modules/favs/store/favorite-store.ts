import { IAlbum } from '../../../modules/album/interfaces/album.interface';
import { IArtist } from '../../../modules/artist/interfaces/artist.interface';
import { ITrack } from '../../../modules/track/interfaces/track.interface';
import { FavoritesStore } from '../interfaces/favorites-store.interface';
import { IFavorites } from '../interfaces/favorites.interface';

export class InMemoryFavoritesStore implements FavoritesStore {
  private favorites: IFavorites = { albums: [], artists: [], tracks: [] };

  async getFavs(): Promise<IFavorites> {
    try {
      return this.favorites;
    } catch (error) {}
  }

  async findArtistInFavs(artistId: string): Promise<IArtist | undefined> {
    try {
      return this.favorites.artists.find((artist) => artist.id === artistId);
    } catch (error) {}
  }

  async findAlbumInFavs(albumId: string): Promise<IAlbum | undefined> {
    try {
      return this.favorites.albums.find((album) => album.id === albumId);
    } catch (error) {}
  }

  async findTrackInFavs(trackId: string): Promise<ITrack | undefined> {
    try {
      return this.favorites.tracks.find((track) => track.id === trackId);
    } catch (error) {}
  }

  async deleteArtistFromFavs(artistId: string): Promise<boolean> {
    try {
      const artistsUpdated = this.favorites.artists.filter(
        (artist) => artist.id !== artistId,
      );

      this.favorites.artists = artistsUpdated;
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteTrackFromFavs(trackId: string): Promise<boolean> {
    try {
      const tracksUpdated = this.favorites.tracks.filter(
        (track) => track.id !== trackId,
      );

      this.favorites.tracks = tracksUpdated;
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteAlbumFromFavs(albumId: string): Promise<boolean> {
    try {
      const albumsUpdated = this.favorites.albums.filter(
        (album) => album.id !== albumId,
      );

      this.favorites.albums = albumsUpdated;
      return true;
    } catch (error) {
      return false;
    }
  }

  async addArtistToFavs(artist: IArtist): Promise<boolean> {
    try {
      this.favorites.artists.push(artist);
      return true;
    } catch (error) {
      return false;
    }
  }

  async addAlbumToFavs(album: IAlbum): Promise<boolean> {
    try {
      this.favorites.albums.push(album);
      return true;
    } catch (error) {
      return false;
    }
  }

  async addTrackToFavs(track: ITrack): Promise<boolean> {
    try {
      this.favorites.tracks.push(track);
      return true;
    } catch (error) {
      return false;
    }
  }
}
