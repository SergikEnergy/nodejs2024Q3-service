import { CreateTrackDto } from '../dto/create-track.dto';
import { ITrackStore } from '../interfaces/track-store.interface';
import { ITrack } from '../interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryTrackStore implements ITrackStore {
  private tracks: ITrack[] = [];

  async getTracks(): Promise<ITrack[]> {
    try {
      return this.tracks;
    } catch (error) {}
  }

  async findById(id: string): Promise<ITrack | undefined> {
    try {
      return this.tracks.find((elem) => elem.id === id);
    } catch (error) {}
  }

  async create(track: CreateTrackDto): Promise<ITrack> {
    try {
      const newTrack: ITrack = {
        ...track,
        id: uuidv4(),
        artistId: track.artistId || null,
        albumId: track.albumId || null,
      };

      this.tracks.push(newTrack);

      return newTrack;
    } catch (error) {}
  }

  async update(track: ITrack): Promise<ITrack | null> {
    try {
      const tracks = await this.getTracks();
      const trackIndex = tracks.findIndex((item) => item.id === track.id);
      if (trackIndex === -1) return null;

      const updatedTrack: ITrack = {
        ...track,
        artistId: track.artistId || null,
        albumId: track.albumId || null,
      };

      tracks.splice(trackIndex, 1, updatedTrack);
      this.tracks = tracks;

      return updatedTrack;
    } catch (error) {}
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      this.tracks = this.tracks.filter((elem) => elem.id !== id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async resetAlbumIdsInTracks(albumId: string): Promise<boolean> {
    try {
      this.tracks = this.tracks.map((track) => {
        if (track.albumId !== albumId) return track;
        return { ...track, albumId: null };
      });
    } catch (error) {
      return false;
    }
  }

  async resetArtistIdsInTracks(artistId: string): Promise<boolean> {
    try {
      this.tracks = this.tracks.map((track) => {
        if (track.artistId !== artistId) return track;
        return { ...track, artistId: null };
      });
    } catch (error) {
      return false;
    }
  }
}
