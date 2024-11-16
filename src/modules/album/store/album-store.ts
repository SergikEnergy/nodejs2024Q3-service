import { CreateAlbumDto } from '../dto/create-album.dto';
import { IAlbumStore } from '../interfaces/album-store.interface';
import { IAlbum } from '../interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryAlbumsStore implements IAlbumStore {
  private albums: IAlbum[] = [];

  async getAlbums(): Promise<IAlbum[]> {
    try {
      return this.albums;
    } catch (error) {}
  }

  async findById(id: string): Promise<IAlbum | undefined> {
    try {
      return this.albums.find((info) => info.id === id);
    } catch (error) {}
  }

  async findByArtistId(artistId: string): Promise<IAlbum | undefined> {
    try {
      return this.albums.find((info) => info.artistId === artistId);
    } catch (error) {}
  }

  async create(album: CreateAlbumDto): Promise<IAlbum> {
    try {
      const newAlbum: IAlbum = {
        ...album,
        id: uuidv4(),
        artistId: album.artistId || null,
      };
      this.albums.push(newAlbum);
      return newAlbum;
    } catch (error) {}
  }

  async update(album: IAlbum): Promise<IAlbum | null> {
    try {
      const albums = await this.getAlbums();
      const albumIndex = albums.findIndex((item) => item.id === album.id);
      if (albumIndex === -1) return null;

      const updatedAlbum: IAlbum = {
        ...album,
        artistId: album.artistId || null,
      };

      albums.splice(albumIndex, 1, updatedAlbum);
      this.albums = albums;

      return updatedAlbum;
    } catch (error) {}
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      this.albums = this.albums.filter((elem) => elem.id !== id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async removeArtistIdFromAlbum(artistId: string): Promise<boolean> {
    try {
      this.albums = this.albums.map((album) => {
        if (album.artistId !== artistId) return album;
        return { ...album, artistId: null };
      });
    } catch (error) {
      return false;
    }
  }
}
