import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackStore } from './interfaces/track-store.interface';
import { ITrackService } from './interfaces/track-service.interface';
import { ITrack } from './interfaces/track.interface';

@Injectable()
export class TrackService implements ITrackService {
  constructor(@Inject('TrackStore') private readonly store: ITrackStore) {}

  async findAll(): Promise<ITrack[]> {
    try {
      return await this.store.getTracks();
    } catch (error) {}
  }

  async findById(id: string): Promise<ITrack | null> {
    try {
      return await this.store.findById(id);
    } catch (error) {}
  }

  async createTrack(track: CreateTrackDto): Promise<ITrack> {
    try {
      return await this.store.create(track);
    } catch (error) {}
  }

  async update(id: string, info: UpdateTrackDto): Promise<ITrack> {
    try {
      return await this.store.update({ id, ...info });
    } catch (error) {}
  }

  async deleteTrack(id: string): Promise<boolean> {
    try {
      await this.store.deleteById(id);
      return true;
    } catch {
      return false;
    }
  }
}
