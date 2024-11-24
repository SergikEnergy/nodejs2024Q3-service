import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistsService } from './interfaces/artist-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService implements IArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async createArtist(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(newArtist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findById(id: string) {
    const foundArtist = await this.artistRepository.findOne({ where: { id } });
    if (!foundArtist)
      throw new NotFoundException(`Artist with id:${id} not found!`);

    return foundArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const foundArtist = await this.findById(id);

    const updatedArtist = { ...foundArtist, ...updateArtistDto };

    return await this.artistRepository.save(updatedArtist);
  }

  async deleteArtist(id: string) {
    const res = await this.artistRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Artist with id:${id} not found!`);
    }
  }
}
