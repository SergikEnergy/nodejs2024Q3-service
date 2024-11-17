import { Injectable, NotFoundException } from '@nestjs/common';
import { IFavoritesService } from './interfaces/favorites-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { FavsEntity } from './entities/favs.entity';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { NotFoundResourceException } from '../../common/exceptions/not-found-resource-exception';

@Injectable()
export class FavsService implements IFavoritesService {
  constructor(
    @InjectRepository(FavsEntity)
    private readonly favsRepository: Repository<FavsEntity>,

    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,

    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,

    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  private async createStartRepository() {
    const favs = this.favsRepository.create({
      albums: [],
      tracks: [],
      artists: [],
    });
    return await this.favsRepository.save(favs);
  }

  private async getRepository() {
    const favs = await this.favsRepository.find({
      relations: { albums: true, artists: true, tracks: true },
      take: 1,
    });

    if (!favs || !favs.length) {
      return await this.createStartRepository();
    }

    return favs[0];
  }

  async getAll() {
    const favs = await this.getRepository();
    const { albums, artists, tracks } = favs;

    return { albums, artists, tracks };
  }

  async findTrack(trackId: string) {
    const trackInfo = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!trackInfo) {
      throw new NotFoundResourceException('track', trackId);
    }
    return trackInfo;
  }

  async addTrack(trackId: string) {
    const foundTrack = await this.findTrack(trackId);

    const favs = await this.getRepository();
    favs.tracks.push(foundTrack);
    await this.favsRepository.save(favs);
  }

  async deleteTrack(trackId: string) {
    const favs = await this.getRepository();

    const indexInFavs = favs.tracks.findIndex((track) => track.id === trackId);
    if (indexInFavs === -1)
      throw new NotFoundException(
        `Track with id:${trackId} was not found in favorites!`,
      );

    favs.tracks.splice(indexInFavs, 1);
    await this.favsRepository.save(favs);
  }

  async findArtist(artistId: string) {
    const artistInfo = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!artistInfo) {
      throw new NotFoundResourceException('track', artistId);
    }
    return artistInfo;
  }

  async addArtist(artistId: string) {
    const foundArtist = await this.findArtist(artistId);

    const favs = await this.getRepository();
    favs.artists.push(foundArtist);
    await this.favsRepository.save(favs);
  }

  async deleteArtist(artistId: string) {
    const favs = await this.getRepository();

    const indexInFavs = favs.artists.findIndex(
      (artist) => artist.id === artistId,
    );
    if (indexInFavs === -1)
      throw new NotFoundException(
        `Track with id:${artistId} was not found in favorites!`,
      );

    favs.artists.splice(indexInFavs, 1);
    await this.favsRepository.save(favs);
  }

  async findAlbum(albumId: string) {
    const albumInfo = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!albumInfo) {
      throw new NotFoundResourceException('track', albumId);
    }
    return albumInfo;
  }

  async addAlbum(albumId: string) {
    const foundAlbum = await this.findAlbum(albumId);

    const favs = await this.getRepository();
    favs.albums.push(foundAlbum);
    await this.favsRepository.save(favs);
  }

  async deleteAlbum(albumId: string) {
    const favs = await this.getRepository();

    const indexInFavs = favs.albums.findIndex((album) => album.id === albumId);
    if (indexInFavs === -1)
      throw new NotFoundException(
        `Track with id:${albumId} was not found in favorites!`,
      );

    favs.albums.splice(indexInFavs, 1);
    await this.favsRepository.save(favs);
  }
}
